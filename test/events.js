import dotenv from 'dotenv'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const deskbookers = new Deskbookers({
  https: process.env.API_HTTPS === 'true',
  host: process.env.API_HOST
})

test('Unread count', async t => {
  await deskbookers.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const unread = await deskbookers.events.unread()
  t.truthy(unread.total)
})

test('Events', async t => {
  await deskbookers.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  // Get tab id
  const unread = await deskbookers.events.unread()
  const tabId = unread.tabs[0].id

  // List events
  const events = await deskbookers.events.list(tabId)
  const firstBatch = await events.next()
  t.truthy(firstBatch.value.length)
})
