import Users from './resources/Users'
import Workplaces from './resources/Workplaces'
import ShoppingCart from './resources/ShoppingCart'

const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1
const API_LANG = 'en-gb'

const resources = {
  users: Users,
  workplaces: Workplaces,
  cart: ShoppingCart
}

export default class Deskbookers {
  constructor ({
    https = true,
    host = API_HOST,
    version = API_VERSION,
    lang = API_LANG
  }) {
    // Options
    this.api = { https, host, version, lang }

    // Init resources
    for (let name in resources) {
      this[name] = new resources[name](this.api)
    }
  }
}
