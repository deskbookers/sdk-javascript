import Resource from '../Resource'
import Users from './Users'

export default class Payments extends Resource {
  source = 'payments';

  constructor (api) {
    super(api)
    // Create sub-resources
    this.users = new Users(api)
  }
}
