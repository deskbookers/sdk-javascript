import Resource from '../Resource'
import Users from './Users'
import Plans from './Plans'
import Subscriptions from './Subscriptions'
import Invoices from './Invoices'

export default class Payments extends Resource {
  constructor (api) {
    super(api)
    // Create sub-resources
    this.users = new Users(api)
    this.plans = new Plans(api)
    this.subscriptions = new Subscriptions(api)
    this.invoices = new Invoices(api)
  }
}