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

  request (spec) {
    let options = {
      method: (spec.method || 'GET').toUpperCase()
    }
    let url = `${this.apiUrl}${spec.path}?__resellerID=10000`

    if (spec.fields) {
      url += `&__fields=[${spec.fields.join(',')}]`
    }

    // Generate query string
    if (spec.query) {
      for (let query in spec.query) {
        url += `&${query}=${spec.query[query]}`
      }
    }

    return fetch(url, options).then(resp => resp.json())
  }
}

module.exports = Resource
