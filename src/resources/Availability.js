import Resource from './Resource'

export default class Availability extends Resource {
  source = 'availability';

  async retrieve ({
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

  async retrieveForFullCalendar({
    start,
    end,
    spaceId,
    noCache = false
  }) {
    return await this.request({
      path: `spaces/${spaceId}/fullCalendar`,
      params: {
        noCache,
        start,
        end
      }
    })
  }
}
