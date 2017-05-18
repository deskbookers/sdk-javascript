import Resource from '../Resource'

export default class Preferences extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user/preferences'
  }

  async list () {
    return await this.request({
      method: 'GET',
      path: this.endpoint
    })
  }

  async retrieve (key) {
    return await this.request({
      method: 'GET',
      path: `${this.endpoint}/${key}`
    })
  }

  async create (params = {}) {
    const { key, value } = params
    const isBulk = (!key && !value) && Array.isArray(params)

    return this.request({
      method: 'POST',
      path: this.endpoint,
      params: {
        isBulk,
        preferences: isBulk ? params : { key, value }
      }
    })
  }
}
