import Resource from './Resource'
import bcrypt from 'bcryptjs'

export default class Account extends Resource {
  constructor (api) {
    super(api)
  }

  retrieveSalt (email) {
    return this.request({
      method: 'GET',
      path: email ? 'prepareLogin' : 'prepareRegister',
      params: email ? { email } : {}
    })
  }

  validateCredentials (email, passwordHash) {
    return this.request({
      method: 'GET',
      path: 'login',
      params: {
        email,
        password: passwordHash
      }
    })
  }

  async login (email, password = '') {
    const salt = await this.retrieveSalt(email) || ''
    const hash = await bcrypt.hash(password, salt)
    const result = await this.validateCredentials(email, hash)

    // Set session on parent class
    this.api.session = {
      privateKey: result.privateKey,
      publicKey: result.publicKey,
      user: result.user
    }

    return await this.retrieve()
  }

  forgot (email) {
    return this.request({
      method: 'GET',
      path: 'forgot-password',
      params: {
        email
      }
    }).then(() => true)
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

  logout () {
    return this.request({
      method: 'POST',
      path: 'logout'
    }).then(() => {
      this.api.session = null
      return true
    })
  }

  retrieve () {
    return this.request({
      method: 'GET',
      path: 'user'
    }).then(
      ({
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
      }) => ({
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
      })
    )
  }

  contexts ({ ...params } = {}) {
    return this.request({
      method: 'GET',
      path: 'user/contexts',
      params
    })
  }
}
