import Resource from './resources/Resource'
import Users from './resources/Users'
import Workplaces from './resources/Workplaces'
import Cart from './resources/Cart'

const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1
const API_LANG = 'en-gb'
const API_RESELLER_ID = 10000

const resources = {
  users: Users,
  workplaces: Workplaces,
  cart: Cart
}

export default class Deskbookers {
  constructor ({
    https = true,
    host = API_HOST,
    version = API_VERSION,
    lang = API_LANG,
    resellerId = API_RESELLER_ID
  }) {
    // Options
    this.https = https
    this.host = host
    this.version = version
    this.lang = lang
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

  getSession () {
    return this.hasSession()
      ? { ...this.session }
      : null
  }

  async validateSession () {
    if (!this.hasSession()) return false

    try {
      const resource = new Resource(this)
      const result = await resource.request({
        method: 'GET',

        // TODO
        path: 'test'
      })

      return !!result
    } catch (e) {
      console.error(e)
      return false
    }
  }

  setSession (session) {
    if (
      session &&
      session.privateKey &&
      session.publicKey &&
      session.user
    ) {
      this.session = session
    } else {
      this.session = null
    }
    return this
  }

  async logout () {
    this.setSession()
    return this
  }

  async login (email, password, ...args) {
    const session = await this.users.login(email, password, ...args)
    this.setSession(session)
    return session.user
  }

  async signup (params, ...args) {
    const session = await this.users.signup(params, ...args)
    this.setSession(session)
    return session.user
  }
}
