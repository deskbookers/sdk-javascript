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

test('enquire a count products using filter', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.reports.bookings.enquire({
    venueId: 13998,
    type: 'count_products',
    start: '2017-11-01',
    end: '2017-12-01',
    filter: 'commission',
    task: false
  })
  console.log(data)
  t.truthy(data)
})

test('enquire a booking report', async t => {
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

test('request a booking report', async t => {
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

test('enquire an auto resolving booking referrers report', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  let progress = 0
  const data = await deskbookers.reports.bookingReferrers.enquire({
    start: '2017-09-01',
    end: '2017-09-02',
    onProgress: (job) => {
      progress++
    }
  })
  t.truthy(progress)
  t.truthy(data.url)
  t.truthy(data.jobInfo)
  t.truthy(data.jobInfo.id)
})

test('enquire an non auto resolving booking referrers report', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.reports.bookingReferrers.enquire({
    start: '2017-09-01',
    end: '2017-09-02',
    autoRetrieve: false
  })
  t.falsy(data.url)
  t.truthy(data.jobInfo)
  t.truthy(data.jobInfo.id)
})

test('retrieve a booking referrers report', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.reports.bookingReferrers.enquire({
    start: '2017-09-01',
    end: '2017-09-02',
    autoRetrieve: false
  })
  const data2 = await deskbookers.reports.bookingReferrers.retrieve({
    jobId: get(data, 'jobInfo.id')
  })
  t.truthy(data2)
  t.truthy(data2.jobInfo)
  t.truthy(data2.jobInfo.id)
})
