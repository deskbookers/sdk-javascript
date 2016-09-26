const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1

const resources = {
  Workplaces: require('./resources/Workplaces')
}

class Deskbookers {
  constructor () {
    this.api = {
      host: API_HOST,
      version: API_VERSION
    }

    for (let name in resources) {
      this[`${name.toLowerCase()}`] = new resources[name](this.api)
    }
  }
}

module.exports = Deskbookers
