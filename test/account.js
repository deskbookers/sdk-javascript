import dotenv from 'dotenv'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const deskbookers = new Deskbookers({
  https: process.env.API_HTTPS === 'true',
  host: process.env.API_HOST
})

test('Login', async t => {
  await t.notThrows(async () => await deskbookers.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  ))
})

test('Signup', async t => {
  // Generate random data
  const firstName = `First${Math.random()}`
  const lastName = `Last${Math.random()}`
  const email = `email${Math.random()}@example.org`
  const password = 'pass1234'

  // Test signup
  await t.notThrows(async () => await deskbookers.signup({
    firstName,
    lastName,
    email,
    password
  }))
})

test('Logout', async t => {
  // Login and store session
  await deskbookers.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )
  const session = deskbookers.session

  // Logout
  await deskbookers.logout()
  t.is(deskbookers.session, null)

  // Reuse previous session
  deskbookers.session = session
  t.false(await deskbookers.validateSession())
})

// Validate session
test('Validate session', async t => {
  // Login
  await deskbookers.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  // Validate session
  t.true(await deskbookers.validateSession())

  // Check email for logged in user
  const current = await deskbookers.account.retrieve()
  t.not(current, null)
  if (current) {
    t.is(current.email, process.env.LOGIN_EMAIL)
  }
})
