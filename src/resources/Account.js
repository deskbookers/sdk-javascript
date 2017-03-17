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

  login (email, password = '') {
    return new Promise(async (resolve, reject) => {
      try {
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
        resolve(user)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  signup ({
    firstName: suppliedFirstName,
    lastName: suppliedLastName,
    email: suppliedEmail,
    password: suppliedPassword = ''
  }) {
    return new Promise(async (resolve, reject) => {
      try {
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

        resolve({
          id,
          email,
          fullName,
          firstName,
          lastName
        })
      } catch (e) {
        reject(e.message)
      }
    })
  }

  logout () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.request({
          method: 'POST',
          path: 'logout'
        })

        this.api.session = null
        resolve(true)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  retrieve () {
    return new Promise(async (resolve, reject) => {
      try {
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

        resolve({
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
      } catch (e) {
        reject(e.message)
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
}
