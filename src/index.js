import Users from './resources/Users'
import Workplaces from './resources/Workplaces'

const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1

const resources = {
  Users,
  Workplaces
}

export default class Deskbookers {
  constructor (https = true, apiHost = API_HOST, apiVersion = API_VERSION) {
    this.api = {
      https, host: apiHost, version: API_VERSION
    }

    for (let name in resources) {
      this[`${name.toLowerCase()}`] = new resources[name](this.api)
    }
  }
}
