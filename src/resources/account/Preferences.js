import DeskbookersError from '../../DeskbookersError'
import Resource from '../Resource'

export default class Preferences extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user/preferences'
  }

  async list () {
    const preferences = await this.request({
      method: 'GET',
      path: this.endpoint
    })

    const map = new Map()
    for (const item in preferences) {
      map.set(item, preferences[item])
    }

    return map
  }

  async retrieve (...keys) {
    if (!keys.length) {
      throw new DeskbookersError('Keys are required')
    }

    const preferences = await this.request({
      method: 'GET',
      path: this.endpoint,
      params: {
        keys
      }
    })

    // Return singleton
    if (keys.length === 1) {
      return preferences[0]
    }

    // Return Map for multiple
    const map = new Map()
    keys.forEach((key, i) => map.set(key, preferences[i]))
    return map
  }

  async update (preferences = {}) {
    const res = this.request({
      method: 'POST',
      path: this.endpoint,
      params: {
        preferences
      }
    })

    return this.list()
  }
}
