import Resource from './Resource'

export default class Availability extends Resource {
  async listEvents ({
    start,
    end,
    venueId,
    noCache = false
  }) {
    return await this.request({
      source: 'availability',
      path: `venues/${venueId}`,
      params: {
        noCache,
        start,
        end
      }
    })
  }
}
