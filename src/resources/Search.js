import Resource from './Resource'
import { DeskbookersError } from '../errors'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

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

  async spaceSuggestions ({
    text,
    context,
    language,
    resolveBounds = false
  } = {}) {
    const params = {
      q: text || '',
      resolveBounds
    }
    if (!isNil(context)) {
      params.context = context
    }
    if (!isNil(language)) {
      params.language = language
    }

    return await this.request({
      method: 'GET',
      path: '/spaces/suggestions',
      params,
      fields:["name", "geometry.location", "place_id", "formatted_address"]
    })
  }
}
