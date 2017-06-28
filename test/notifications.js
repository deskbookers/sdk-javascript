import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  API_NOTIFICATIONS_HOST,
  API_NOTIFICATIONS_PATH,
  API_HTTPS,
  API_HOST
} = process.env

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      notifications: {
        host: API_NOTIFICATIONS_HOST,
        path: API_NOTIFICATIONS_PATH
      }
    }
  })

  if (login) {
    await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  }
  return deskbookers
}

test('list notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list(999999999, 0, 10)
  t.truthy(data)
})

test('list notifications by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list(999999999, 0, 10, 'corgi')
  t.truthy(data)
})

test('list unread notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list(999999999, 0, 10, null, true)
  t.truthy(data)
})

test('list unread notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list(999999999, 0, 10, 'blue-corgi', false)
  t.truthy(data)
})

test('list notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count(999999999, 0, 10)
  console.log(data)
  t.truthy(data)
})

test('list notifications by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count(999999999, 0, 10, 'corgi')
  console.log(data)
  t.truthy(data)
})

test('list unread notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count(999999999, 0, 10, null, true)
  console.log(data)
  t.truthy(data)
})

test('list unread notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count(999999999, 0, 10, 'blue-corgi', false)
  console.log(data)
  t.truthy(data)
})

test('create new notification', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.create(
    {
      userId: 2, 
      type: 'fluffycorgi',
      context: 'c12345',
      meta:'{"clientName": "Chompers", "companyName": "Lambda3"}',
      createdDate: 1498653156259
    }
  )
  t.truthy(data)
})

test.before('create notification', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.create(
    {
      userId: 2, 
      type: 'fluffycorgi',
      context: 'c12345',
      meta:'{"clientName": "Chompers", "companyName": "Lambda3"}',
      createdDate: 1496925186484
    }
  )
  t.truthy(data)
})

test('mark notification read', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.update(
    2, {type: 'fluffycorgi'}
  )
  t.truthy(data)
})

test('delete old notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.delete()
  t.truthy(data)
})
