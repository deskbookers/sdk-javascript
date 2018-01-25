import Resource from './Resource'
import { DeskbookersError } from '../errors'
import get from 'lodash/get'

export default class Search extends Resource {
  constructor (api) {
    super(api)
    this.source = 'search'
  }

  async spaces (params) {
    if (!params || typeof params !== 'object') {
      throw new DeskbookersError('Parameters must be an Object')
    }

    const result = await this.request({
      method: 'POST',
      path: '/spaces/search',
      body: params
    })

    return {
      total: get(result, 'hits.total', 0),
      results: get(result, 'hits.hits', []),
      context: get(result, 'context', {}),
      facets: get(result, 'aggregations', {})
    }
  }
}
