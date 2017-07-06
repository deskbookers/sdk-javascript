import Resource from './Resource'
import { DeskbookersError } from '../errors'

export default class Bookings extends Resource {
  constructor (api) {
    super(api)
  }

  async month (date, venueId) {
    return await this.request({
      method: 'GET',
      path: `/booking/month`,
      params: {
        date,
        venueId
      }
    })
  }

}