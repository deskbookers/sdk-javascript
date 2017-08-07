import Resource from '../Resource'

export default class Plans extends Resource {
  source = 'payments'
 
  constructor (api) {
    super(api)
    this.endpoint = 'plans'
  }

  /**
   * List plans
   *
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @return {Object[]} - plans.
   */
  async list ({limit, lastId} = {}) {
    return await this.request({
      path: `${this.endpoint}`,
      params: {
        limit,
        lastId
      }
    })
  }

  /**
   * Get plan
   *
   * @param {int} planId - Plan Id.
   * @return {Object[]} - plan.
   */
  async get ({planId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${planId}`
    })
  }

  /**
   * Get plan subscriptions
   *
   * @param {string} planId - Plan Id.
   * @return {Object[]} - subscriptions.
   */
  async subscriptions ({planId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${planId}/subscriptions`
    })
  }
}