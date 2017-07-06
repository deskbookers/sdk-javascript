import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import moment from 'moment'
import Deskbookers from '../src'

import util from 'util'

dotenv.load()

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })

  if (login) {
    await deskbookers.account.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD)
  }
  return deskbookers
}

test('Get booking', async t => {
  const deskbookers = await client(true)
  const date = moment().subtract(2, 'months').calendar();
  
  let booking = await deskbookers.bookings.month(date, 12686)
  console.dir(booking)
})
