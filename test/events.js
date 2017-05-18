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

test('Unread count', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const unread = await deskbookers.events.unread()
  t.truthy(unread.total)
})

test('Events', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  // Get tab id
  const unread = await deskbookers.events.unread()
  const tabId = unread.tabs[0].id

  // Retrieve events
  const events = await deskbookers.events.retrieve(tabId)
  const firstBatch = await events.next()
  t.truthy(firstBatch.value.length)
})

test('Can retrieve first page containing all events', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const res = await deskbookers.events.list(30, 0)

  t.truthy(Array.isArray(res))
})

test('Can mark all events as read', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const res = await deskbookers.events.markAllAsRead()

  t.truthy(res)
})
