import Resource from './Resource'
import bcrypt from 'bcryptjs'

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
    try {
      const salt = await this.retrieveSalt(email || '') || ''
      const hash = await bcrypt.hash(password || '', salt)
      const result = await this.validateCredentials(email, hash)
      return {
        privateKey: result.privateKey,
        publicKey: result.publicKey,
        user: result.user
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async signup ({ password, email, firstName, lastName }) {
    try {
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
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
