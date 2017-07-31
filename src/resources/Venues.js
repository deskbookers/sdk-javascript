import Resource from './Resource'
import { DeskbookersError } from '../errors'

export default class Venues extends Resource {
  constructor (api) {
    super(api)
  }

  /**
   * List payment settings by venue
   *
   * @param {int} venueId - Venue Id body.
   * @return {Object}
   */
  async getPaymentSettings (venueId) {
    return this.request({
      method: 'GET',
      path: `location/${venueId}/payment-settings`
    })
  }
  /**
   * Create  payment settings to venue
   *
   * @param {int} venueId - Venue Id body.
   * @param {Object} paymentSettings Venue Payment Settings
   * @return {Object}
   */
  async savePaymentSettings (venueId, paymentSettings) {
    return this.request({
      method: 'POST',
      path: `location/${venueId}/payment-settings`,
      params: {
        data: paymentSettings
      }
    })
  }
}
