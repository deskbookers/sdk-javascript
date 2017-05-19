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

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })

  if (login) {
    await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  }

  return deskbookers
}

test('Login', async t => {
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)
})

test('Signup', async t => {
  const deskbookers = await client()
  const signup = await deskbookers.account.signup({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'p4ssw0rd'
  })

  t.truthy(signup.id)
})

test('Forgot', async t => {
  const deskbookers = await client()
  const forgot = await deskbookers.account.forgot(faker.internet.email())
  t.truthy(forgot)
})

test('Logout', async t => {
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  // Logout
  await deskbookers.account.logout()

  t.is(deskbookers.session, null)
})

test('Retrieve', async t => {
  const deskbookers = await client()

  // Fail when logged out
  t.throws(deskbookers.account.retrieve())


  // Succeed when logged in
  await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  t.notThrows(deskbookers.account.retrieve())
})

test('Set language', async t => {
  const deskbookers = await client(true)

  const language = 'en-gb'
  const result = await deskbookers.account.setLanguage(language)
  const user = await deskbookers.account.retrieve()

  t.truthy(result)
  t.is(user.language, language)
})

test('Preferences', async t => {
  const deskbookers = await client(true)

  // Create / Update preferences
  const update = await deskbookers.account.preferences.update({
    foo: 'bar',
    baz: 'bat'
  })

  // Retrieve single
  const retrieve = await deskbookers.account.preferences.retrieve('foo')

  // List partial
  const listPartial = await deskbookers.account.preferences.list('foo', 'baz')

  // List all
  const list = await deskbookers.account.preferences.list()

  // Test
  t.is(update.get('foo'), 'bar')
  t.is(retrieve, 'bar')
  t.is(listPartial.get('baz'), 'bat')
  t.truthy(list)
})
