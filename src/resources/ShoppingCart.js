import Resource from './Resource'
import md5 from 'md5-hex'
import moment from 'moment'
import random from 'rndm'
import isArray from 'lodash/isArray'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import isPlainObject from 'lodash/isPlainObject'

export default class ShoppingCart extends Resource {
  constructor (api, data) {
    super(api)
    this.update(data)
  }

  /**
   * Update
   *
   * @param object data
   * @return ShoppingCart
   */
  update (data) {
    this.data = data || {}
    this.data.spaces = this.data.spaces || {}
    return this
  }

  /**
   * Create a new shopping cart instance.
   *
   * @return ShoppingCart
   */
  newInstance () {
    return new this.constructor(this.api)
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
      forEach (space.products(), (product) =>
        batch.push({ bookingIndex, ...product.checkData() })
      )

      ++bookingIndex;
    })

    return batch
  }

  async refresh () {
    const data = this.batchCheckData()
    console.log(data)
  }
}

export class Item {
  constructor (shoppingCart, data) {
    this.shoppingCart = shoppingCart
    this.updateData(data)
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

    return this
  }

  checkData () {
    return {
      id: this.data.hash,
      quantity: this.data.quantity
    }
  }

  export () {
    return this.data
  }
}

export class Product extends Item {
  checkData () {
    return {
      ...super(),
      productId: this.data.id,
      start: moment(this.data.start).unix(),
      end: moment(this.data.end).unix(),
      price: this.data.override || null
    }
  }

  export () {
    return {
      ...super(),
      start: this.data.start ? moment(this.data.start).unix() : null,
      end: this.data.end ? moment(this.data.end).unix() : null
    }
  }
}

export class SpaceProduct extends Product {
  constructor (space, data) {
    super(space.shoppingCart, data)
    this.space = space
  }

  update (...args) {
    super(...args)

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
    super(...args)

    // Normalize products
    this.setProducts(this.data.products)

    // Normalize start/end
    this.data.start = this.data.start ? moment(this.data.start) : null
    this.data.end = this.data.end ? moment(this.data.end) : null

    // Normalize people
    const { people, minimum_capacity: min, maximum_capacity: max } = this.data
    if (min && max) this.data.people = Math.max(min, Math.min(max, people))

    return this
  }

  checkData () {
    return {
      ...super(),
      workplaceId: this.data.id,
      people: this.data.people,
      start: moment(this.data.start).unix(),
      end: moment(this.data.end).unix(),
      price: this.data.override || null,
      recurring: !!(this.data.recurringData && this.data.recurringData.enabled)
    }
  }

  export () {
    return {
      ...super(),
      start: this.data.start ? moment(this.data.start).unix() : null,
      end: this.data.end ? moment(this.data.end).unix() : null,
      products: map(this.products(), (product) => product.export())
    }
  }
}
