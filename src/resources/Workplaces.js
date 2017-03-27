import Resource from './Resource'

export default class Workplaces extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'workplace'
  }

  retrieve (workplaceId) {
    return this.request({
      method: 'GET',
      path: `/${this.endpoint}/${workplaceId}`,
      fields: []
    })
  }

  list (params) {
    // Build query from params
    // if Location, etc.

    return this.request({
      method: 'GET',
      path: '/search/results',
      fields: []
    })
  }

  urgency (workplaceId, params) {
    return new Promise(async (resolve, reject) => {
      const isArray = Array.isArray(params)

      // API expects params as []
      if (!isArray && typeof params === 'object') {
        params = [ params ]
      } else if (!isArray) {
        reject('Parameters must be an Object or Array')
      }

      const urgency = await this.request({
        method: 'GET',
        path: `/${this.endpoint}/${workplaceId}/urgency`,
        params: { params }
      })

      resolve(urgency)
    })
  }
}
