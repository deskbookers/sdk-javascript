import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

function client () {
  return new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })
}

test('get financial settings', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const paymentSettings = await deskbookers.venues.getPaymentSettings(11710)
  t.truthy(paymentSettings)
})

test('save financial settings', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  let payment = {
    name: 'aaa222',
    bankInfo: 'NL01BANK012345222',
    bic: 'ABCDEF22',
    tax: '1234222',
    company: 'hockerson2',
    debtor: '1234522',
    mark: 'rarara22',
    address:
    { country: 'The Netherlands',
      addressLine1: 'a2',
      postalcode: '2222AK',
      place: 'lolala2',
      telephonenumber: '+31610512222',
      telephonenumber2: '+31123412222',
      email: 'e2@e2.c2'
    }
  }
  const saved = await deskbookers.venues.savePaymentSettings(11710, payment)
  const paymentSettings = await deskbookers.venues.getPaymentSettings(11710)

  t.truthy(saved)
})

test('retrieve a venue', async t => {
  const venueId = 12686
  const width = 360
  const height = 240

  // Prepare API
  const deskbookers = client()
  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  // Test simple call
  const venue1 = await deskbookers.venues.retrieve(venueId)
  t.truthy(typeof venue1 === 'object')
  t.is(venue1.id, venueId)
  t.truthy(venue1.name)
  t.truthy(venue1.timezone)
  t.truthy(venue1.lang)
  t.truthy(venue1.slug)

  // Test fields
  const venue2 = await deskbookers.venues.retrieve(venueId, {
    fields: ['id', 'name', 'address_object']
  })
  t.truthy(typeof venue2 === 'object')
  t.is(venue2.id, venueId)
  t.is(venue2.name, venue1.name)
  t.is(
    JSON.stringify(venue2.address_object),
    JSON.stringify(venue1.address_object)
  )
  t.falsy(venue2.timezone)

  // Test image params
  const venue3 = await deskbookers.venues.retrieve(venueId, {
    params: {
      width,
      height,
      crop: true
    },
    fields: ['id', 'image_urls']
  })
  t.truthy(typeof venue3 === 'object')
  t.is(venue3.id, venueId)
  t.truthy(Array.isArray(venue3.image_urls))
  t.truthy(venue3.image_urls.reduce((result, url) => {
    return result && url.indexOf(`${width}x${height}x1`) !== -1
  }, true))
})
