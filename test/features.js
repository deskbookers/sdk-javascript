import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  API_FEATURE_HOST,
  API_FEATURE_PATH,
  API_HTTPS,
  API_HOST
} = process.env

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      features: {
        host: API_FEATURE_HOST,
        path: API_FEATURE_PATH
      }
    }
  })

  if (login) {
    await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  }
  return deskbookers
}

test('list features', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.features.list()
  t.truthy(data)
})

test('list features by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.features.list('booking')
  t.truthy(data)
})

test('list venue features', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.features.listByVenue(1)
  t.truthy(data)
})

test('check feature is enabled for venue', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.features.checkFeatureByVenue(
    1, 'regularCustumerDiscounts'
  )
  t.truthy(data)
})

test.before('create new feature', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.features.create(
    {name: 'testName',  description: 'teste description', type: 'venue'}
  )
  t.truthy(data)
})

test('update feature', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)
  
  const data = await deskbookers.features.update(
    'testName',
    {name: 'testName',  description: 'teste description 2', type: 'venue2', parentId: null}
  )
  t.truthy(data)
})

test.after('delete feature', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.features.delete('testName')
  t.truthy(data)
})

test('updateFeatureByVenue feature', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  let start = new Date().setDate(new Date().getDate()-20) 
  let end = null
  const data = await deskbookers.features.updateFeatureByVenue(
    2,
    'bookingTool',
    {
      enabled: true,
      start,
      end
    }
  )
  t.truthy(data)
})