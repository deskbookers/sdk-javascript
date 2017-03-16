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
    this.session_ = null

    // Init resources
    for (let name in resources) {
      this[name] = new resources[name](this)
    }
  }

  hasSession () {
    return !!(this.session_ && this.session_.privateKey)
  }

  get session () {
    return this.hasSession()
      ? { ...this.session_ }
      : null
  }

  async validateSession () {
    if (!this.hasSession()) return false

    try {
      const result = await this.account.retrieve()
      if (result && result.id === this.session.user.id) {
        // Update user info
        this.session_.user = result
        return true
      }
    } catch (e) {
      return false
    }
  }

  set session (session) {
    if (
      session &&
      session.privateKey &&
      session.publicKey &&
      session.user
    ) {
      this.session_ = session
    } else {
      this.session_ = null
    }
    return this
  }

  async logout () {
    await this.account.logout()
    this.session = null
    return this
  }

  async login (email, password, ...args) {
    const session = await this.account.login(email, password, ...args)
    this.session = session
    return session.user
  }

  async signup (params, ...args) {
    const session = await this.account.signup(params, ...args)
    this.session = session
    return session.user
  }
}
