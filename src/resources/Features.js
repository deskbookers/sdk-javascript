import Resource from './Resource'

export default class Features extends Resource {
  source = 'features';

  /**
   * List features
   *
   * @param {string} [type=''] - Filter features by type.
   * @param {bool} [noCache=false] - Flag to turn off the cache.
   * @param {string} [country=''] - Country for retriving prices.
   * @return {Object[]} - Features.
   */
  async list ({type = '', noCache = false, country = ''} = {}) {
    return await this.request({
      path: `features/${type}`,
      params: {
        noCache, 
        country
      }
    })
  }

  /**
   * Create feature
   *
   * @param {Object} feature - Feature body.
   * @return {Object}
   */
  async create (feature) {
    return await this.request({
      method: 'POST',
      path: 'features',
      body: feature
    })
  }

  /**
   * Update feature
   * 
   * @param {string} featureName - Feature name(id).
   * @param {Object} feature - Feature body.
   * @return {Object} - Status
   */
  async update (featureName, feature) {
    return await this.request({
      method: 'PUT',
      path: `features/${featureName}`,
      body: feature
    })
  }

  /**
   * Delete feature
   * 
   * @param {string} featureName - Feature name(id).
   * @return {Object} - Status
   */
  async delete (featureName) {
    return await this.request({
      method: 'DELETE',
      path: `features/${featureName}`
    })
  }

  /**
   * List feature by venue
   * 
   * @param {integer} venueId - Venue id.
   * @param {bool} [noCache=false] - Flag to turn off the cache.
   * @return {Object[]}
   */
  async listByVenue (venueId, noCache = false) {
    return await this.request({
      path: `venues/${venueId}/features`,
      params: {
        noCache
      }
    })
  }

  /**
   * Check if feature is avaiable by venue
   * 
   * @param {integer} venueId - Venue id.
   * @param {string} featureName - Feature name(id).
   * @param {bool} [noCache=false] - Flag to turn off the cache.
   * @return {Object[]}
   */
  async checkFeatureByVenue (venueId, featureName, noCache = false) {
    const result = await this.request({
      path: `venues/${venueId}/features/${featureName}`,
      params: {
        noCache
      }
    })
    return result.enabled
  }

  /**
   * Create pr Update and feature for a venue
   * 
   * @param {integer} venueId - Venue id.
   * @param {string} featureName - Feature name(id).
   * @param {Object} feature - Feature body.
   * @return {Object[]}
   */
  async updateFeatureByVenue (venueId, featureName, feature) {
    return await this.request({
      method: 'PUT',
      path: `venues/${venueId}/features/${featureName}`,
      body: feature
    })
  }
}