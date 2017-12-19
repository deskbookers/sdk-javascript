import Resource from '../Resource'
import get from 'lodash/get'

const AUTO_RETRIEVE_TIMEOUT = 1000

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
   * @param {bool} autoRetrieve
   * @return {Promise<Object>} Promise resolving with object with info about the end result
   */
  async enquire ({ start, end, autoRetrieve = true } = {}) {
    let jobInfo = await this.request({
      method: 'POST',
      path: this.endpoint,
      body: {
        start,
        end
      }
    })
    let job = { jobInfo, logs: [] }

    if (autoRetrieve) {
      do {
        await wait(AUTO_RETRIEVE_TIMEOUT)
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

function wait (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
