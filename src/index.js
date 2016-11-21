const HTTPS = true
const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1

const resources = {
  Users: require('./resources/Users'),
  Workplaces: require('./resources/Workplaces')
}

class Deskbookers {
  constructor (apiHost = API_HOST) {
    this.api = {
      https: HTTPS,
      host: apiHost,
      version: API_VERSION
    }

    for (let name in resources) {
      this[`${name.toLowerCase()}`] = new resources[name](this.api)
    }
  }
}

module.exports = Deskbookers
