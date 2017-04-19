import Resource from './Resource'
import bcrypt from 'bcryptjs'

export default class Account extends Resource {
  constructor (api) {
    super(api)
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

  async login (email, password = '', backofficeLogin = false) {
    const salt = await this.retrieveSalt(email) || ''
    const hash = await bcrypt.hash(password, salt)
    const result = await this.validateCredentials(email, hash)

    // Set session on parent class
    this.api.session = {
      privateKey: result.privateKey,
      publicKey: result.publicKey,
      user: result.user
    }

    const user = await this.retrieve()

    if (backofficeLogin) {
      await this.backofficeLogin()
    }

    return user
  }

  async backofficeLogin () {
    return await this.request({
      method: 'POST',
      path: 'backoffice/login'
    })
  }

  async forgot (email) {
    await this.request({
      method: 'GET',
      path: 'forgot-password',
      params: {
        email
      }
    })
    return true
  }

  async signup ({
    firstName: suppliedFirstName,
    lastName: suppliedLastName,
    email: suppliedEmail,
    password: suppliedPassword = ''
  }) {
    const salt = await this.retrieveSalt() || ''
    const hash = await bcrypt.hash(suppliedPassword, salt)
    const result = await this.request({
      method: 'GET',
      path: 'register',
      params: {
        firstName: suppliedFirstName,
        lastName: suppliedLastName,
        email: suppliedEmail,
        password: hash
      }
    })

    const {
      id,
      email,
      name: fullName,
      first_name: firstName,
      lastName,
    } = result.user

    return {
      id,
      email,
      fullName,
      firstName,
      lastName
    }
  }

  async logout () {
    await this.request({
      method: 'POST',
      path: 'logout'
    })
    this.api.session = null
    return true
  }

  async retrieve () {
    const {
      id,
      email,
      firstName,
      lastName,
      name_without_title: fullName,
      country,
      organisations,
      timezone,
      lang: language,
      balance
    } = await this.request({
      method: 'GET',
      path: 'user'
    })

    return {
      id,
      email,
      firstName,
      lastName,
      fullName,
      country,
      organisations,
      timezone,
      language,
      balance
    }
  }

  async contexts ({ ...params } = {}) {
    return await this.request({
      method: 'GET',
      path: 'user/contexts',
      params
    })
  }

  async menu (context) {
    return await this.request({
      path: `user/menu/${context}`
    })
  }
}
