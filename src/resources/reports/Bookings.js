import Resource from '../Resource'

export default class Bookings extends Resource {
  source = 'reports';

  constructor (api) {
    super(api)
    this.endpoint = 'bookings'
  }

  /**
   * Request booking report
   *
   * @param {int} venueId
   * @param {string} type
   * @param {date} start
   * @param {date} end
   * @param {string} interval
   * @param {bool} task
   * @return {Object[]} - job / result.
   */
  async enquire ({ venueId, type, start, end, interval, task = false } = {}) {
    return await this.request({
      method: 'POST',
      path: `${this.endpoint}/${venueId}/${type}?task=${task.toString()}`,
      params: {
        task
      },
      body: {
        type,
        start,
        end,
        interval
      }
    })
  }

  /**
   * Request booking report
   *
   * @param {int} venueId
   * @param {string} type
   * @param {int} jobId
   * @return {Object[]} - job / result.
   */
  async retrieve ({ venueId, type, jobId } = {}) {
    return await this.request({
      method: 'GET',
      path: `${this.endpoint}/${venueId}/${type}/${jobId}`
    })
  }
}
