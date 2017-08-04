import Resource from '../Resource'

export default class Subscriptions extends Resource {
  source = 'payments'

  constructor (api) {
    super(api)
    this.endpoint = 'subscriptions'
  }

  /**
   * List subscription
   *
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @param {string} status - Filter.
   * @return {Object[]} - subscriptions.
   */
  async list ({ limit, lastId, status } = {}) {
    return await this.request({
      path: `${this.endpoint}`,
      params: {
        limit,
        lastId,
        status
      }
    })
  }

  /**
   * get subscription
   *
   * @param {string} subscriptionId - subscription id.
   * @return {Object[]} - subscription.
   */
  async get ({ subscriptionId } = {}) {
    return await this.request({
      path: `${this.endpoint}/${subscriptionId}`
    })
  }
}
