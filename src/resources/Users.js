import Resource from './Resource'
import bcrypt from 'bcryptjs'
import { hmac, sha512 } from 'hash.js'

export default class Users extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user'
  }

  async retrieveSalt (email) {
    return await this.request({
      method: 'GET',
      path: email ? 'prepareLogin' : 'prepareRegister',
      params: email ? { email } : {}
    })
  }

  async validateCredentials (email, passwordHash) {
    return await this.request({
      method: 'GET',
      path: 'login',
      params: {
        email,
        password: passwordHash
      }
    })
  }

  async login (email, password) {
    const salt = await this.retrieveSalt(email || '') || ''
    const hash = await bcrypt.hash(password || '', salt)
    const result = await this.validateCredentials(email, hash)
    return {
      privateKey: result.privateKey,
      publicKey: result.publicKey,
      user: result.user
    }
  }

  async signup ({ password, email, firstName, lastName }) {
    const salt = await this.retrieveSalt()
    const hash = await bcrypt.hash(password || '', salt)
    const result = await this.request({
      method: 'GET',
      path: 'register',
      params: {
        firstName,
        lastName,
        email,
        password: hash
      }
    })
    return {
      privateKey: result.privateKey,
      publicKey: result.publicKey,
      user: result.user
    }
  }

  async logout () {
    return await this.request({
      method: 'GET',
      path: 'user/logout'
    })
  }

  async current () {
    return await this.request({
      method: 'GET',
      path: 'user'
    })
  }

  async validateSession ({ publicKey, privateKey } = {}) {
    // Prepare security data
    const nonce = `${new Date().getTime()}${Math.random()}`
    const hash = hmac(sha512, privateKey)
      .update(nonce)
      .digest('hex')

    // Make the request
    const result = await this.request({
      method: 'POST',
      path: 'validateSession',
      userApi: false,
      params: { publicKey, nonce, hash }
    })

    // Check result
    if (!result || !result.valid) {
      return null
    } else {
      const checkHash = hmac(sha512, privateKey)
        .update(nonce + result.user.id)
        .digest('hex')
      if (checkHash !== result.hash) return null
      else return result.user
    }
  }
}
