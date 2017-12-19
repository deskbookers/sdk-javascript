import Resource from '../Resource'
import get from 'lodash/get'

export default class BookingReferrers extends Resource {
  source = 'reports';

  constructor (api) {
    super(api)
    this.endpoint = 'bookingReferrers'
  }

  /**
   * Request booking referrer report
   *
   * @param {date} start
   * @param {date} end
   * @return {Promise<Object>} Promise resolving with object with info about the end result
   */
  async enquire ({ start, end, autoResolve = true } = {}) {
    let jobInfo = await this.request({
      method: 'POST',
      path: this.endpoint,
      body: {
        start,
        end
      }
    })
    let job = { jobInfo, logs: [] }

    if (autoResolve) {
      do {
        job = await this.retrieve({ jobId: get(job, 'jobInfo.id') })
      } while (!isFinalState(get(job, 'jobInfo.state')))
    }

    return job
  }

  /**
   * Request booking report
   *
   * @param {int} venueId
   * @param {string} type
   * @param {int} jobId
   * @return {Object[]} - job / result.
   */
  async retrieve ({ jobId } = {}) {
    return await this.request({
      method: 'GET',
      path: `${this.endpoint}/${jobId}`
    })
  }
}

function isFinalState (state) {
  switch (state) {
    case 'complete':
    case 'failed':
      return true
    default:
      return false
  }
}
