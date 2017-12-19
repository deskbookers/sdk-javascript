import Resource from '../Resource'
import Bookings from './Bookings'
import BookingReferrers from './BookingReferrers'

export default class Reports extends Resource {
  source = 'reports';

  constructor (api) {
    super(api)
    // Create sub-resources
    this.bookings = new Bookings(api)
    this.bookingReferrers = new BookingReferrers(api)
  }
}
