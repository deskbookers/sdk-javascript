import Resource from './Resource'

export default class Bookings extends Resource {
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
