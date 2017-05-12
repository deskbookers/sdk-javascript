import Resource from './Resource'

export default class Events extends Resource {
  constructor (api) {
    super(api)
  }

  async unread () {
    return await this.request({
      method: 'GET',
      path: 'event/unreadCounts'
    })
  }

  async list (tabId = null, limit = 10) {
    if (!tabId) {
      throw new Error('No tab id')
    }

    const events = await this.request({
      method: 'GET',
      path: `event/${parseInt(tabId)}`
    })

    if (!events.length) {
      throw new Error('No events')
    }

    // Get most recent event id
    const startId = events[0].event_id

    // Return async generator
    return this.iterateEvents(tabId, startId, limit, 0)
  }

  async * iterateEvents (tabId, startId, limit, offset) {
    const events = await this.getEvents(tabId, startId, limit, offset)
    yield events

    if (!events.length) {
      return events
    } else {
      yield * this.iterateEvents(tabId, startId, limit, offset + offset)
    }
  }

  async getAllEvents (limit, offset, tags = []) {
    return await this.request({
      method: 'GET',
      path: 'event',
      params: {
        limit,
        offset,
        tags
      }
    })
  }

  async markAllAsRead (tags = []) {
    return await this.request({
      method: 'POST',
      path: 'event/read',
      params: {
        tags
      }
    })
  }

  async getEvents (tabId, startId, limit, offset) {
    return await this.request({
      method: 'GET',
      path: `event/${parseInt(tabId)}`,
      params: {
        startId,
        limit,
        offset
      }
    })
  }
}
