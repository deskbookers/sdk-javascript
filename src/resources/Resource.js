const fetch = require('node-fetch')

const API_VERSION = 1
const API_BASE = 'https://backoffice.2cnnct.com/userapi'

class Resource {
  constructor () {
    this.apiVersion = API_VERSION
    this.apiBase = API_BASE
  }

  get apiUrl () {
    return `${this.apiBase}/v${this.apiVersion}`
  }

  request (options) {
    const url = `${this.apiUrl}${options.path}?__resellerID=10000&__fields=[]`
    return fetch(url, {
      method: options.method
    }).then(response => response.json())
  }
}

module.exports = Resource
