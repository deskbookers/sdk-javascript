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

  const data = await deskbookers.notifications.list({userId: 999999999, start: 0, limit: 10, noCache: true})
  console.log('list notifications', data)
  t.truthy(data)
})

test('list notifications by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list({userId: 999999999, start: 0, limit: 10, type: 'corgi', noCache: true})
  console.log('list notifications by type', data)
  t.truthy(data)
})

test('list unread notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list({userId: 999999999, start: 0, limit: 10, type: null, unread: true, noCache: true})
  console.log('list unread notifications', data)
  t.truthy(data)
})

test('list unread notifications by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.list({userId: 999999999, start: 0, limit: 10, type: 'blue-corgi', unread: false, noCache: true})
  console.log('list unread notifications by type', data)
  t.truthy(data)
})

test('count notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count({userId: 999999999, start: 0, limit: 10, noCache: true})
  console.log('count notifications', data)
  t.truthy(data)
})

test('count notifications by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count({userId: 999999999, start: 0, limit: 10, type: 'corgi', noCache: true})
  console.log('count notifications by type', data)
  t.truthy(data)
})

test('count unread notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count({userId: 999999999, start: 0, limit: 10, type: null, unread: true, noCache: true})
  console.log('count unread notifications', data)
  t.truthy(data)
})

test('count read notifications by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.count({userId: 999999999, start: 0, limit: 10, type: 'blue-corgi', unread: false, noCache: true})
  console.log('count read notifications by type', data)
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

  await deskbookers.notifications.create(
    {
      userId: 3, 
      type: 'fluffycorgi',
      context: 'c12345',
      meta:'{"clientName": "Chompers", "companyName": "Lambda3"}',
      createdDate: 1498653156259
    }
  )

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

test('mark notification read by type', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.flagAsRead(2, 'fluffycorgi')
  t.truthy(data)
})

test('mark notification read', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.flagAsRead(3)
  t.truthy(data)
})

test('delete old notifications', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.notifications.delete()
  t.truthy(data)
})
