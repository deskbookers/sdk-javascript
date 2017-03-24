import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import moment from 'moment'
import Deskbookers from '../src'
dotenv.load()

const deskbookers = new Deskbookers({
  https: process.env.API_HTTPS === 'true',
  host: process.env.API_HOST
})

test('Urgency data', async t => {
  const now = moment()
  const monthAgo = now.clone().subtract(31, 'days')
  const start = monthAgo.toISOString()
  const end = now.toISOString()

  const what = {
    bookings: { type: 'bookings', start, end },
    visitors: { type: 'visitors', start, end },
    visitorsCity: { type: 'visitors', city: 'amsterdam', start, end },
  }

  const data = await deskbookers.workplaces.urgencyData(17657, what)

  t.truthy(
    data && typeof data === 'object',
    'Expected the result to be an object'
  )
  for (let key in what) {
    t.truthy(typeof data[key] === 'number', `Expected '${key}' to be a number`)
  }
})
