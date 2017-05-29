import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  API_AVAILABILITY_HOST,
  API_AVAILABILITY_PATH,
  API_HTTPS,
  API_HOST,
  AVAILABILITY_VENUE_ID,
  AVAILABILITY_START,
  AVAILABILITY_END
} = process.env

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      availability: {
        host: API_AVAILABILITY_HOST,
        path: API_AVAILABILITY_PATH
      }
    }
  })

  if (login) {
    await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  }

  return deskbookers
}

test('listEvents', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  // List events
  const data = await deskbookers.availability.retrieve({
    venueId: AVAILABILITY_VENUE_ID,
    start: AVAILABILITY_START,
    end: AVAILABILITY_END
  })

  t.is(typeof data, 'object')
  t.is(typeof data.timezone, 'string')
  t.truthy(Array.isArray(data.businessHours))
  t.truthy(Array.isArray(data.spaces))

  for (let hour of data.businessHours) {
    t.is(typeof hour, 'object')
    t.truthy(Array.isArray(hour.dow))
    t.is(typeof hour.start, 'string')
    t.is(typeof hour.end, 'string')
    t.is(typeof hour.type, 'string')
  }

  for (let space of data.spaces) {
    t.is(typeof space.id, 'number')
    t.is(typeof space.title, 'string')
    t.truthy(Array.isArray(space.events))

    for (let event of space.events) {
      t.is(typeof event, 'object')
      t.is(typeof event.id, 'string')
      t.is(typeof event.start, 'string')
      t.is(typeof event.end, 'string')
      t.is(typeof event.type, 'string')
      t.is(typeof event.description, 'string')

      if (event.type === 'booking') {
        t.is(typeof event.bookingId, 'number')
        t.is(typeof event.bookingStart, 'string')
        t.is(typeof event.bookingEnd, 'string')
      }
    }
  }
})
