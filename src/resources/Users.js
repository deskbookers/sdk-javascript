import Resource from './Resource'
import Error from '../Error'
import bcrypt from 'bcryptjs'

export default class Users extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user'
  }

  retrieveSalt (email) {
    return this.request({
      method: 'GET',
      path: email ? '/prepareLogin' : '/prepareRegister',
      params: email ? { email: `"${email}"` } : {}
    })
  }

  validateCredentials (email, passwordHash) {
    return this.request({
      method: 'GET',
      path: '/login',
      params: {
        email: `"${email}"`,
        password: `"${passwordHash}"`
      }
    })
  }

  login (email, password) {
    return this.retrieveSalt(email)
      .then(resp => {
        if (resp.error) throw new Error(resp.errorMessage)
        const passwordHash = bcrypt.hashSync(password, resp.result)
        return this.validateCredentials(email, passwordHash)
      })
      .then(resp => {
        if (resp.error) throw new Error('Incorrect login credentials.')
        return {
          token: resp.result.privateKey,
          user: resp.result.user
        }
      })
  }

  signup (params) {
    return this.retrieveSalt()
      .then(resp => {
        if (resp.error) throw new Error(resp.errorMessage)
        const passwordHash = bcrypt.hashSync(params.password, resp.result)
        return this.request({
          method: 'GET',
          path: '/register',
          params: {
            firstName: `"${params.firstName}"`,
            lastName: `"${params.lastName}"`,
            email: `"${encodeURIComponent(params.email)}"`,
            password: `"${encodeURIComponent(passwordHash)}"`
          }
        })
      })
      .then(resp => {
        if (resp.result.errors) {
          for (let error in resp.result.errors) {
            throw new Error(resp.result.errors[error])
          }
        }

        return {
          token: resp.result.privateKey,
          user: resp.result.user
        }
      })
  }
}
