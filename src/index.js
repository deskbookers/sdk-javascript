import Account from './resources/Account'
import Cart from './resources/Cart'
import Events from './resources/Events'
import Workplaces from './resources/Workplaces'

const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1
const API_LANGUAGE = 'en-gb'
const API_RESELLER_ID = 10000

const resources = {
  account: Account,
  cart: Cart,
  events: Events,
  workplaces: Workplaces
}

export default class Deskbookers {
  constructor ({
    https = true,
    host = API_HOST,
    version = API_VERSION,
    language = API_LANGUAGE,
    resellerId = API_RESELLER_ID
  }) {
    // Options
    this.https = https
    this.host = host
    this.version = version
    this.language = language
    this.resellerId = resellerId
    this.session = null

    // Init resources
    for (let name in resources) {
      this[name] = new resources[name](this)
    }
  }

  hasSession () {
    return !!(this.session && this.session.privateKey)
  }

  async validateSession () {
    if (!this.hasSession()) return false

    try {
      const result = await this.account.retrieve()
      if (result && result.id === this.session.user.id) {
        // Update user info
        this.session.user = result
        return true
      }
    } catch (e) {
      return false
    }
  }
}
