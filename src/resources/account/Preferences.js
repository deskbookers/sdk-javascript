import DeskbookersError from '../../DeskbookersError'
import Resource from '../Resource'

export default class Preferences extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user/preferences'
  }

  async retrieve (key) {
    const value = await this.request({
      method: 'GET',
      path: this.endpoint,
      params: {
        keys: [key]
      }
    })

    return value[0]
  }

  async list (...keys) {
    const preferences = await this.request({
      method: 'GET',
      path: this.endpoint,
      params: {
        keys
      }
    })

    // Construct and return Map
    const map = new Map()
    keys.forEach((key, i) => map.set(key, preferences[i]))
    return map
  }

  async update (preferences = {}) {
    const prefs = await this.request({
      method: 'POST',
      path: this.endpoint,
      params: {
        preferences
      }
    })

    // Construct and return Map
    const map = new Map()
    Object.keys(prefs).forEach(key => map.set(key, prefs[key]))
    return map
  }
}
