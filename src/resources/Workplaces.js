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

  urgencyData (workplaceId, what) {
    return this.request({
      method: 'GET',
      path: `/${this.endpoint}/${workplaceId}/urgency`,
      params: {
        what
      }
    })
  }
}
