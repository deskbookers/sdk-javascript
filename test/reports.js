import dotenv from 'dotenv'
import { get } from 'lodash'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  API_REPORTS_HOST,
  API_REPORTS_PATH,
  API_HTTPS,
  API_HOST
} = process.env

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      reports: {
        host: API_REPORTS_HOST,
        path: API_REPORTS_PATH
      }
    }
  })

  if (login) {
    await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  }
  return deskbookers
}

test('enquire and booking report', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)
  const data = await deskbookers.reports.bookings.enquire({
    venueId: 39418,
    type: 'month_overview',
    start: '2017-09-01',
    end: '2017-11-01',
    task: false
  })
  t.truthy(data)
})

test('request and booking report', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)
  const data = await deskbookers.reports.bookings.retrieve({
    venueId: 39418,
    type: 'month_overview',
    jobId: 13
  })
  t.truthy(data)
})

