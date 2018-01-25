import Resource from './Resource'
import { DeskbookersError } from '../errors'

export default class Spaces extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'workplace'
  }

  async retrieve (spaceId) {
    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/${spaceId}`,
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

  async urgency (spaceId, params) {
    const isArray = Array.isArray(params)

    // API expects params as []
    if (!isArray && typeof params === 'object') {
      params = [ params ]
    } else if (!isArray) {
      throw new DeskbookersError(
        'Parameters must be an Object or Array'
      )
    }

    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/${spaceId}/urgency`,
      params: { params }
    })
  }

  async search (params) {
    return await this.api.search.spaces(params)
  }
}
