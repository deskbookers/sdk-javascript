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

  const what = [
    { type: 'bookings', start, end },
    { type: 'visitors', start, end },
    { type: 'visitors', city: 'amsterdam', start, end },
  ]

  const urgency = await deskbookers.workplaces.urgency(17657, what)

  t.truthy(Array.isArray(urgency), `Expected data to be an array but got ${JSON.stringify(urgency)}`)
  t.truthy(urgency.length === what.length, 'Expected urgency to be the same length as \'what\'')

  for (let i = 0; i < what.length; ++i) {
    t.truthy(typeof urgency[i] === 'number', `Expected urgency['${i}'] to be a number`)
  }
})
