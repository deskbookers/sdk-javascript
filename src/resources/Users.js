const Resource = require('./Resource')
const Error = require('../Error')
const bcrypt = require('bcryptjs')

class Users extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user'
  }

  retrieveSalt (email) {
    return this.request({
      method: 'GET',
      path: '/prepareLogin',
      query: { email: `"${email}"` }
    })
  }

  validateCredentials (email, password) {
    return this.request({
      method: 'GET',
      path: '/login',
      query: {
        email: `"${email}"`,
        password: `"${password}"`
      }
    })
  }

  login (email, password) {
    return this.retrieveSalt(email)
      .then(resp => {
        if (resp.error) throw new Error(resp.errorMessage)
        const hashedPassword = bcrypt.hashSync(password, resp.result)
        return this.validateCredentials(email, hashedPassword)
      })
      .then(resp => {
        if (resp.error) throw new Error('Incorrect login credentials.')
        return {
          token: resp.result.privateKey,
          user: resp.result.user
        }
      })
  }
}

module.exports = Users
