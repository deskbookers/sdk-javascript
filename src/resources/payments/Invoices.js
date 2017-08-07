import Resource from '../Resource'

export default class Invoices extends Resource {
  source = 'payments'

  constructor (api) {
    super(api)
    this.endpoint = 'invoices'
  }

  /**
   * List invoice
   *
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @return {Object[]} - invoices.
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
   * Get invoice
   *
   * @param {int} invoiceId - Invoice id.
   * @return {Object[]} - Invoices.
   */
  async get ({invoiceId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${invoiceId}`
    })
  }
}