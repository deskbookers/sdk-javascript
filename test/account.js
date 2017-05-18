import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
import faker from 'faker'
dotenv.load()

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD
} = process.env

function client () {
  return new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })
}

async function login (t, deskbookers, dbg) {
  const user = await deskbookers.account.login(
    LOGIN_EMAIL,
    LOGIN_PASSWORD
  )

  t.truthy(deskbookers.session)

  return user
}

test('Login', async t => {
  const user = await login(t, client(), 'Login')

  t.truthy(user.id)
})

test('Signup', async t => {
  const signup = await client().account.signup({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'p4ssw0rd'
  })

  t.truthy(signup.id)
})

test('Forgot', async t => {
  const forgot = await client().account.forgot(faker.internet.email())

  t.truthy(forgot)
})

test('Logout', async t => {
  const deskbookers = client()
  await login(t, deskbookers, 'Logout')

  t.truthy(deskbookers.session)

  // Logout
  await deskbookers.account.logout()

  t.is(deskbookers.session, null)
})

test('Retrieve', async t => {
  const deskbookers = client()

  // Should fail whilte logged out
  t.throws(deskbookers.account.retrieve())

  await login(t, deskbookers, 'Retrieve')

  // Should succeed while logged in
  t.notThrows(deskbookers.account.retrieve())
})

test('Set language', async t => {
  // Login
  const deskbookers = client()
  await login(t, deskbookers, 'Set language')

  // Set language test
  for (let language of ['en-gb']) { // 'en-gb', 'nl-nl', 'de-de']) {
    const result = await deskbookers.account.setLanguage(language)
    const user = await deskbookers.account.retrieve()

    t.truthy(result)
    t.is(user.language, language)
  }
})
