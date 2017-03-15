import Resource from './Resource'

export default class Events extends Resource {
  constructor (api) {
    super(api)
  }

  async list (tabId = null, offset = 10) {
    if (!tabId) {
      throw new Error('No tab id')
    }

    const events = await this.request({
      method: 'GET',
      path: `event/${parseInt(tabId)}`
    })

    // Get most recent event id
    const startId = events[0].event_id

    // Return async generator
    return this.iterateEvents(tabId, startId, offset)
  }

  async * iterateEvents (tabId, startId, offset) {
    const events = await this.getEvents(tabId, startId, offset)
    yield events

    if (!events.length) {
      return events
    } else {
      yield * this.iterateEvents(tabId, startId, offset + offset)
    }
  }

  getEvents (tabId, startId, offset) {
    return new Promise(async (resolve, reject) => {
      try {
        const events = await this.request({
          method: 'GET',
          path: `event/${parseInt(tabId)}`,
          params: {
            startId,
            offset
          }
        })
        resolve(events)
      } catch (e) {
        console.log(e.message)
        reject(e.message)
      }
    })
  }
}
