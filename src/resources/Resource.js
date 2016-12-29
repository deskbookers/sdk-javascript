import fetch from '../lib/fetch'

export default class Resource {
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
    let url = `${this.apiUrl}${spec.path}?__resellerID=10000&__i18n="en-gb"`

    if (spec.fields) {
      url += `&__fields=[${spec.fields.join(',')}]`
    }

    // Generate query string
    if (spec.params) {
      for (let param in spec.params) {
        url += `&${param}=${spec.params[param]}`
      }
    }

    return fetch(url, options).then(resp => resp.json())
  }
}
