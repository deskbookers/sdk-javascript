import Resource from './Resource'
import bcrypt from 'bcryptjs'

export default class Account extends Resource {
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

  async login (email, password = '', backoffice = false) {
    const salt = await this.retrieveSalt(email) || ''
    const hash = await bcrypt.hash(password, salt)
    const result = await this.validateCredentials(email, hash)

    // Set session on parent class
    this.api.session = {
      privateKey: result.privateKey,
      publicKey: result.publicKey,
      user: result.user
    }

    if (backoffice) {
      await this.backofficeLogin()
    }

    return await this.retrieve()
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
      lastName
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
      balance,
      created: createdAt
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
      balance,
      createdAt: new Date(parseInt(createdAt) * 1e3)
    }
  }

  async setLanguage (language) {
    return await this.request({
      method: 'POST',
      path: 'user/language',
      params: {
        lang: language
      }
    })
  }

  async setTimezone (timezone) {
    return await this.request({
      method: 'POST',
      path: 'user/timezone',
      params: {
        timezone
      }
    })
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

  async report (message, category, browser, page, context, extras = []) {
    return await this.request({
      method: 'POST',
      path: 'report',
      params: {
        message,
        category,
        browser,
        page,
        context,
        extras
      }
    })
  }
}
