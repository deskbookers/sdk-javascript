import Resource from './Resource'

export default class Notifications extends Resource {
  source = 'notifications';

  /**
   * List notifications by user
   *
   * @param {int} userId - Filter features by userId.
   * @param {int} start- Starting row for pagination.
   * @param {int} limit - Limit results per request.
   * @param {string} [type=''] - Filter results by type.
   * @param {bool} [unread=''] - Filter results by unread.
   * @param {bool} [noCache=false] - Flag to turn off the cache.
   * @return {Object[]} - Notifications.
   */
  async list ({
    userId,
    start,
    limit,
    type,
    unread,
    noCache = false
  } = {}) {
    const params = {
      userId,
      start,
      limit,
      type,
      unread,
      noCache
    }
    clean(params)
    return await this.request({
      path: `notifications/${userId}`,
      params
    })
  }

  /**
   * Count notifications by user
   *
   * @param {int} userId - Filter features by userId.
   * @param {int} start- Starting row for pagination.
   * @param {int} limit - Limit results per request.
   * @param {string} [type=''] - Filter results by type.
   * @param {bool} [unread=''] - Filter results by unread.
   * @param {bool} [noCache=false] - Flag to turn off the cache.
   * @return {int} - Notifications.
   */
  async count ({
    userId,
    start,
    limit,
    type,
    unread,
    noCache = false
  }) {
    const params = {
      userId,
      start,
      limit,
      type,
      unread,
      noCache
    }
    clean(params)
    return await this.request({
      path: `notifications/count/${userId}`,
      params
    })
  }

  /**
   * Create notification
   *
   * @param {Object} notification - Notification body.
   * @return {Object}
   */
  async create (notification) {
    return await this.request({
      method: 'POST',
      path: 'notifications',
      body: notification
    })
  }

  /**
   * Mark notification read 
   * For a given `type`(optional) in the body as a json and for a given `userId`
   *
   * @param {Object} notification - Notification body.
   * @return {Object}
   */
  async flagAsRead (userId, type) {
    return await this.request({
      method: 'PUT',
      path: `notifications/${userId}`,
      body: {type}
    })
  }

  /**
   * Delete notifications created more than 15 days
   * 
   * @return {Object} - Status
   */
  async delete () {
    return await this.request({
      method: 'DELETE',
      path: `notifications`
    })
  }
}

function clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName]
    }
  }
}
