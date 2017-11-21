import Resource from '../Resource'
import Bookings from './Bookings'

export default class Reports extends Resource {
  constructor (api) {
    super(api)
    // Create sub-resources
    this.bookings = new Bookings(api)
  }
}
