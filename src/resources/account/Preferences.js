import DeskbookersError from '../../DeskbookersError'
import Resource from '../Resource'
import { pickAll } from 'ramda'

// Construct and return Map
function constructMap (obj) {
  const map = new Map()

  for (const key in obj) {
    map.set(key, obj[key])
  }

  return map
}

export default class Preferences extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'user/preferences'
  }

  async getCurrentPreferences () {
    const res = await this.request({
      method: 'GET',
      path: this.endpoint
    })

    return JSON.parse(res)
  }

  /**
   * Retrieve a single preference
   */
  async retrieve (key) {
    const prefs = await this.list([key])
    return prefs.get(key) || null
  }

  /**
   * List all preferences, or a subset
   */
  async list (...keys) {
    const current = await this.getCurrentPreferences()

    // Filter preferences based on desired keys
    const prefs = keys.length ? pickAll(keys, current): current

    return constructMap(prefs)
  }

  /**
   * Update preferences by key
   */
  async update (preferences = {}) {
    const prefs = await this.getCurrentPreferences()

    for (const key in preferences) {
      prefs[key] = preferences[key]
    }

    const res = await this.request({
      method: 'POST',
      path: this.endpoint,
      params: {
        preferences: prefs
      }
    })

    return constructMap(JSON.parse(res))
  }
}
