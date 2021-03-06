import Resource from '../Resource'
import Preferences from './Preferences'
import bcrypt from 'bcryptjs'

export default class Account extends Resource {
  constructor (api) {
    super(api)

    // Create sub-resources
    this.preferences = new Preferences(api)
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
    password: suppliedPassword = '',
    backoffice = false
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
      created: createdAt,
      ...others
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
      createdAt: new Date(parseInt(createdAt) * 1e3),
      isSuper: others.super
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

  async groups () {
    return await this.request({
      path: 'user/groups'
    })
  }

  async toggleFavorite (spaceId, favorite, auto = false) {
    if (favorite) {
      return await this.request({
        method: 'POST',
        path: 'user/favorite',
        params: {
          workplaceId: spaceId,
          auto
        }
      })
    } else {
      return await this.request({
        method: 'POST',
        path: 'user/unfavorite',
        params: {
          workplaceId: spaceId
        }
      })
    }
  }

  async favorites() {
    return await this.request({
      method: 'GET',
      path: 'user/favorites'
    })
  }
}
