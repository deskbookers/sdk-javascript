const Resource = require('./Resource')
const Error = require('../Error')
const bcrypt = require('bcryptjs')

class Users extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user'
  }

  login (params) {
    // Get password salt, then validate credentials
    return this.request({
      method: 'GET',
      path: '/prepareLogin',
      query: { email: `"${params.email}"` }
    })
      .then(resp => {
        if (resp.error) throw new Error(resp.errorMessage)
        return this.request({
          method: 'GET',
          path: '/login',
          query: {
            email: `"${params.email}"`,
            password: `"${bcrypt.hashSync(params.password, resp.result)}"`
          }
        })
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
