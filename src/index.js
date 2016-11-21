const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1

const resources = {
  Users: require('./resources/Users'),
  Workplaces: require('./resources/Workplaces')
}

class Deskbookers {
  constructor (https = true, apiHost = API_HOST, apiVersion = API_VERSION) {
    this.api = {
      https, host: apiHost, version: API_VERSION
    }

    for (let name in resources) {
      this[`${name.toLowerCase()}`] = new resources[name](this.api)
    }
  }
}

module.exports = Deskbookers
