import dotenv from 'dotenv'
import test from 'ava'
import Deskbookers from './dist'
import moment from 'moment'
dotenv.load()

const deskbookers = new Deskbookers({
  https: process.env.API_HTTPS === 'true',
  host: process.env.API_HOST
})

// Users
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
  const current = await deskbookers.users.current()
  t.not(current, null)
  if (current) {
    t.is(current.email, process.env.LOGIN_EMAIL)
  }
})

// Shopping cart
test('Test cart availability', async t => {
  const cart = await prepareCart(t)

  t.true(deskbookers.cart.available())

  // TODO: test more
})
const prepareCart = async (t) => {
  try {
    // Login
    await deskbookers.login(
      process.env.LOGIN_EMAIL,
      process.env.LOGIN_PASSWORD
    )

    // Test cart
    const space = deskbookers.cart.addSpace({
      id: 13235,
      start: moment('2016-12-30 12:00'),
      end: moment('2016-12-30 14:00')
    })
    space.addProduct({
      id: 10469
    })
    await deskbookers.cart.refresh()

    return deskbookers.cart
  } catch (e) {
    t.fail(`Error while preparing cart: ${e && e.message || 'Exception occurred'}`)
    return deskbookers.cart
  }
}
