const fetch = require('node-fetch')

class Resource {
  constructor (api) {
    this.api = api
  }

  get apiUrl () {
    const protocol = this.api.https ? 'https' : 'http'
    const url = `${protocol}://${this.api.host}/userapi/v${this.api.version}`
    return url
  }

  request (options) {
    let url = `${this.apiUrl}${options.path}?__resellerID=10000`

    if (options.fields) {
      url += `&__fields=[${options.fields.join(',')}]`
    }

    // Generate query string
    if (options.query) {
      for (let query in options.query) {
        url += `&${query}=${options.query[query]}`
      }
    }

    return fetch(url, {
      method: options.method
    }).then(resp => resp.json())
  }
}

module.exports = Resource
