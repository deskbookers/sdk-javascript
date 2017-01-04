import Resource from './Resource'
import md5 from 'md5-hex'
import moment from 'moment'
import random from 'rndm'
import isArray from 'lodash/isArray'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import isPlainObject from 'lodash/isPlainObject'

export default class Cart extends Resource {
  constructor (api, data) {
    super(api)
    this.update(data)
    this.possibleVouchers_ = {}
  }

  update (data) {
    this.data = data || {}
    this.data.spaces = this.data.spaces || {}
    return this
  }

  newInstance () {
    return new this.constructor(this.api)
  }

  setGroup (groupId) {
    this.data.group = groupId
    return this
  }

  getGroup () {
    return this.data.group || null
  }

  setVoucherCode (code) {
    this.data.voucherCode = code
    return this
  }

  getVoucherCode () {
    return this.data.voucherCode
  }

  possibleVouchers () {
    return this.possibleVouchers_
  }

  items () {
    const items = []
    forEach(this.data.spaces, (space) => {
      items.push(space)
      forEach(space.products(), (product) => {
        items.push(product)
      })
    })
    return items
  }

  spaces () {
    return this.data.spaces
  }

  addSpace (space) {
    space = new Space(this, space)
    this.data.spaces[space.hash()] = space
    return this
  }

  getSpace (hash) {
    return this.data.spaces[hash] || null
  }

  removeSpace (hash) {
    delete this.data.spaces[hash]
    return this
  }

  batchCheckData () {
    const batch = []
    let bookingIndex = 0

    // Spaces
    forEach(this.spaces(), (space) => {
      // Add space check
      batch.push({ bookingIndex, ...space.checkData() })

      // Add space products
      forEach(space.products(), (product) =>
        batch.push({ bookingIndex, ...product.checkData() })
      )

      ++bookingIndex
    })

    return batch
  }

  async refresh (ignoreBooking = null) {
    const batch = this.batchCheckData()
    const { voucherCodes, results } = await this.request({
      method: 'POST',
      path: 'booking/batchCheck',
      params: {
        group: this.getGroup(),
        voucherCode: this.getVoucherCode(),
        ignoreBooking: ignoreBooking && ignoreBooking.id || null,
        action: ignoreBooking && ignoreBooking.action || null,
        batch
      }
    })

    // Vouchers
    this.possibleVouchers_ = {}
    for (let i = 0; i < voucherCodes.length; ++i) {
      this.possibleVouchers_[`c${voucherCodes[i].code}`] = voucherCodes[i]
    }
    if (!this.getVoucherCode() && voucherCodes.length > 0) {
      this.setVoucherCode(voucherCodes[0].code)

      // Refresh with first voucher
      await this.refresh(ignoreBooking)
      return
    }

    // Update items
    forEach(this.spaces(), (space) => {
      // Update space
      if (space.hash() in results) {
        space.update({
          ...space.data,
          ...results[space.hash()]
        })
      }

      forEach(space.products(), (product) => {
        // Update product
        if (product.hash() in results) {
          product.update({
            ...product.data,
            ...results[product.hash()]
          })
        }
      })
    })
  }

  available () {
    let available = true
    forEach(this.items(), (item) => {
      if (!item.available()) {
        available = false
        return false
      }
    })
    return available
  }
}

export class Item {
  constructor (cart, data) {
    this.cart = cart
    this.update(data)
  }

  static generateHash () {
    return `h${md5(`${random(64)}-${new Date().getTime()}`)}`
  }

  hash () {
    return this.data.hash
  }

  update (data) {
    // Set data
    if (data instanceof Item) data = data.data
    this.data = data || {}

    // Make sure it has an unique hash
    if (!this.data.hash) this.data.hash = this.constructor.generateHash()

    // Make sure it has a quantity
    if (!this.data.quantity) this.data.quantity = 1

    // Normalize start/end
    this.data.start = normalizeDate(this.data.start)
    this.data.end = normalizeDate(this.data.end)

    return this
  }

  meta () {
    return this.data.meta || {}
  }

  start () {
    return this.data.start || null
  }

  end () {
    return this.data.end || null
  }

  checkData () {
    return {
      id: this.data.hash,
      quantity: this.data.quantity,
      start: unix(this.data.start),
      end: unix(this.data.end)
    }
  }

  export () {
    return {
      ...this.data,
      start: unix(this.data.start),
      end: unix(this.data.end)
    }
  }

  available () {
    return (
      this.data.ranges &&
      this.data.ranges.length > 0 &&
      this.start() &&
      this.end() &&
      this.data.ranges[0].start <= unix(this.start()) &&
      this.data.ranges[0].end >= unix(this.end()) &&
      this.data.ranges[0].quantity >= this.data.quantity
    )
  }
}

export class Product extends Item {
  checkData () {
    return {
      ...super.checkData(),
      productId: this.data.id,
      price: this.data.override || null
    }
  }
}

export class SpaceProduct extends Product {
  constructor (space, data) {
    super(space.cart, data)
    this.space = space
  }

  update (...args) {
    super.update(...args)

    // Copy start / end from space
    this.data.start = this.space.data.start
    this.data.end = this.space.data.end

    return this
  }
}

export class Space extends Item {
  products () {
    return this.data.products
  }

  addProduct (product) {
    product = new SpaceProduct(this, product)
    this.data.products[product.hash()] = product
    return this
  }

  getProduct (hash) {
    return this.data.products[hash] || null
  }

  removeProduct (hash) {
    delete this.data.products[hash]
    return this
  }

  setProducts (products) {
    // Normalize the products object
    this.data.products = {}
    if (isArray(products) || isPlainObject(products)) {
      forEach(products, (product) => {
        product = new SpaceProduct(this, product)
        this.data.products[product.hash()] = product
      })
    }

    return this
  }

  update (...args) {
    super.update(...args)

    // Normalize products
    this.setProducts(this.data.products)

    // Normalize workplace
    if (this.data.workplace) this.data.meta = this.data.workplace
    delete this.data.workplace

    // Normalize people
    const { people, minimum_capacity: min, maximum_capacity: max } = this.data
    if (min && max) this.data.people = Math.max(min, Math.min(max, people))

    return this
  }

  checkData () {
    return {
      ...super.checkData(),
      workplaceId: this.data.id,
      people: this.data.people,
      price: this.data.override || null,
      recurring: !!(this.data.recurringData && this.data.recurringData.enabled)
    }
  }

  export () {
    return {
      ...super.export(),
      products: map(this.products(), (product) => product.export())
    }
  }
}

export const normalizeDate = (date) => date ? moment(date) : null

export const unix = (date) => {
  const normalized = normalizeDate(date)
  return normalized && normalized.unix() || null
}
