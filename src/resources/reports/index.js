import Resource from '../Resource'
import Bookings from './Bookings'

export default class Reports extends Resource {
  source = 'reports';

  constructor (api) {
    super(api)
    // Create sub-resources
    this.bookings = new Bookings(api)
  }
}
