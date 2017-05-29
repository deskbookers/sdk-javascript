import Resource from './Resource'

export default class Availability extends Resource {
  source = 'availability';

  async list ({
    start,
    end,
    venueId,
    noCache = false
  }) {
    return await this.request({
      path: `venues/${venueId}`,
      params: {
        noCache,
        start,
        end
      }
    })
  }
}
