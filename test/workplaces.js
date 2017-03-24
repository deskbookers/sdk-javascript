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

test('Urgency', async t => {
  const now = moment()
  const monthAgo = now.clone().subtract(31, 'days')
  const start = monthAgo.toISOString()
  const end = now.toISOString()

  const urgency = await deskbookers.workplaces.urgency(17657, [
    { type: 'bookings', start, end },
    { type: 'visitors', start, end },
    { type: 'visitors', city: 'amsterdam', start, end },
  ])

  t.truthy(urgency.length)
})
