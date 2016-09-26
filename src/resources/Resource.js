const API_VERSION = 1

class Resource {
  constructor () {
    super()
  }

  request (url) {
    return fetch(url).then(response => response.json())
  }
}

module.exports = Resource
