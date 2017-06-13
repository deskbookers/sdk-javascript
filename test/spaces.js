import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import moment from 'moment'
import Deskbookers from '../src'
dotenv.load()

function client () {
  return new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })
}

test('Get space', async t => {
  const deskbookers = client()

  const id = 16301
  const space = await deskbookers.spaces.retrieve(id)
  t.is(id, space.id)
})

test('Urgency', async t => {
  const deskbookers = client()

  const now = moment()
  const monthAgo = now.clone().subtract(31, 'days')
  const start = monthAgo.toISOString()
  const end = now.toISOString()

  const request = [
    { type: 'bookings', start, end },
    { type: 'visitors', start, end },
    { type: 'visitors', city: 'amsterdam', start, end }
  ]

  const response = await deskbookers.spaces.urgency(17657, request)

  t.truthy(Array.isArray(response), `Expected response to be an array but got ${JSON.stringify(response)}`)
  t.truthy(response.length === request.length, 'Expected response to be the same length as the request')

  for (let i = 0; i < request.length; ++i) {
    t.truthy(typeof response[i] === 'number', `Expected response['${i}'] to be a number`)
  }
})
