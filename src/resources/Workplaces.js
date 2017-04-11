import Resource from './Resource'

export default class Workplaces extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'workplace'
  }

  async retrieve (workplaceId) {
    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/${workplaceId}`,
      fields: []
    })
  }

  async list (params) {
    // Build query from params
    // if Location, etc.

    return await this.request({
      method: 'GET',
      path: '/search/results',
      fields: []
    })
  }

  async urgency (workplaceId, params) {
    const isArray = Array.isArray(params)

    // API expects params as []
    if (!isArray && typeof params === 'object') {
      params = [ params ]
    } else if (!isArray) {
      throw new Error('Parameters must be an Object or Array')
    }

    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/${workplaceId}/urgency`,
      params: { params }
    })
  }
}
