const fetch = require('node-fetch')

class Resource {
  constructor (api) {
    this.api = api
  }

  get apiUrl () {
    const url = `https://${this.api.host}/userapi/v${this.api.version}`
    return url
  }

  request (options) {
    const url = `${this.apiUrl}${options.path}?__resellerID=10000&__fields=[${options.fields.join(',')}]`
    console.log(url)
    return fetch(url, {
      method: options.method
    }).then(response => response.json())
  }
}

module.exports = Resource
