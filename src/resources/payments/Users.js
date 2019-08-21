import Resource from '../Resource'

export default class Users extends Resource {
  source = 'payments';

  constructor (api) {
    super(api)
    this.endpoint = 'users'
  }

  /**
   * Get user
   *
   * @param {int} userId - User Id.
   * @return {Object[]} - subscriptions.
   */
  async get ({ userId } = {}) {
    return await this.request({
      path: `${this.endpoint}/${userId}`
    })
  }

  /**
   * Get user subscriptions
   *
   * @param {int} userId - User Id.
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @param {string} status - Filter.
   * @return {Object[]} - subscriptions.
   */
  async subscriptions ({userId, limit, lastId, status} = {}) {
    return await this.request({
      path: `${this.endpoint}/${userId}/subscriptions`,
      params: {
        limit,
        lastId,
        status
      }
    })
  }

  /**
   * Get user invoices
   *
   * @param {int} userId - User Id.
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @return {Object[]} - invoices.
   */
  async invoices ({userId, limit, lastId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${userId}/invoices`,
      params: {
        limit,
        lastId
      }
    })
  }

  /**
   * Get user payments
   *
   * @param {int} userId - User Id.
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @return {Object[]} - payments.
   */
  async payments ({userId, limit, lastId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${userId}/payments`,
      params: {
        limit,
        lastId
      }
    })
  }

  /**
   * Create / Update users
   *
   * @param {int} userId - User Id.
   * @param {Object} user - User.
   * @return {Object} - user.
   */
  async upsert ({userId, user} = {}) {
    return await this.request({
      method: 'PUT',
      path: `${this.endpoint}/${userId}`,
      body: user
    })
  }

  /**
   * Create sources for users
   *
   * @param {int} userId - User Id.
   * @param {string} token - Source token.
   * @param {string} email - Email Source token.
   * @param {bool} setDefault - Default flag token.
   * @return {Object[]} - sources.
   */
  async createSource ({userId, token, email, setDefault} = {}) {
    return await this.request({
      method: 'POST',
      path: `${this.endpoint}/${userId}/sources`,
      body: {
        token, email, setDefault
      }
    })
  }

  /**
   * Get user souces
   *
   * @param {int} userId - User Id.
   * @param {int} limit - Pagination limit.
   * @param {string} lastId - Pagination lastId.
   * @return {Object[]} - sources.
   */
  async listSources ({userId, limit, lastId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${userId}/sources`,
      params: {
        limit,
        lastId
      }
    })
  }

  /**
   * Delete user source
   *
   * @param {int} userId - User Id.
   * @param {string} sourceId - Source Id.
   * @return {Object[]} - sources.
   */
  async deleteSource ({userId, sourceId} = {}) {
    return await this.request({
      method: 'DELETE',
      path: `${this.endpoint}/${userId}/sources/${sourceId}`
    })
  }

  /**
   * Set Default user source
   *
   * @param {int} userId - User Id.
   * @param {string} sourceId - Source Id.
   * @return {Object[]} - default source.
   */
  async setDefaultSource ({userId, sourceId} = {}) {
    return await this.request({
      method: 'PUT',
      path: `${this.endpoint}/${userId}/defaultsource/${sourceId}`,
      body: { sourceId }
    })
  }

  /**
   * Create Charge for users
   *
   * @param {int} userId - User Id.
   * @param {Object} token - Source token.
   * @return {Object[]} - charge.
   */
  async createCharge ({userId, charge} = {}) {
    return await this.request({
      method: 'POST',
      path: `${this.endpoint}/${userId}/charge`,
      body: charge
    })
  }

  /**
   * Create setup intents for user
   *
   */
  async createSetupIntent ({userId} = {}) {
    return await this.request({
      path: `${this.endpoint}/${userId}/setupIntents`
    })
  }

  /**
   * Attach payment method to user
   *
   */
  async attachPaymentMethod ({userId, paymentMethodId} = {}) {
    return await this.request({
      method: 'POST',
      path: `${this.endpoint}/${userId}/attachPaymentMethod`,
      body: { paymentMethodId }
    })
  }
}
