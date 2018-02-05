import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
import faker from 'faker'
import InternalApi from 'deskbookers-api/internal'
dotenv.load()

const {
  INTERNAL_API_SECRET,
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  FAVORITE_SPACE_ID
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

function createInternalApi () {
  return new InternalApi({
    secret: INTERNAL_API_SECRET,
    https: false,
    sources: {
      api: { host: '2cnnct.deskbookers.local', path: 'api/v1' }
    },
    fetch
  })
}

async function addMemberToGroup (client, internalApi, add = true) {
  const user = client.session.user

  // Find a random group
  const [ group ] = await internalApi.request({
    path: 'group',
    source: 'api',
    method: 'GET',
    params: {
      __resellerID: 10000,
      '$limit': 1,
      '$order': 'id'
    }
  })

  // Add member
  if (add) {
    await internalApi.request({
      path: `group/${group.id}/members`,
      method: 'POST',
      source: 'api',
      body: {
        __resellerID: 10000,
        email: user.email
      }
    })
  } else {
    await internalApi.request({
      path: `group/${group.id}/members/${user.id}/remove`,
      method: 'POST',
      source: 'api',
      body: {
        __resellerID: 10000
      }
    })
  }

  return group.id
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

  t.truthy(signup)
  t.truthy(deskbookers.session)
  t.is(signup.id, deskbookers.session.user.id)
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

test('Groups', async t => {
  const deskbookers = await client(true)
  const internalApi = createInternalApi()

  const group1 = await addMemberToGroup(deskbookers, internalApi, true)
  const result1 = await deskbookers.account.groups()
  const group2 = await addMemberToGroup(deskbookers, internalApi, false)
  const result2 = await deskbookers.account.groups()

  t.is(group1, group2)
  t.is(Array.isArray(result1), true)
  t.is(Array.isArray(result2), true)
  t.is(result1.map(r => r.id).includes(group1), true)
  t.is(result2.map(r => r.id).includes(group2), false)
})

test('Favorites', async t => {
  const deskbookers = await client(true)

  const id = parseInt(FAVORITE_SPACE_ID, 10)

  await deskbookers.account.toggleFavorite(id, true)
  const result1 = await deskbookers.account.favorites()
  await deskbookers.account.toggleFavorite(id, false)
  const result2 = await deskbookers.account.favorites()

  t.is(Array.isArray(result1), true)
  t.is(Array.isArray(result2), true)
  t.is(result1.includes(id), true)
  t.is(result2.includes(id), false)
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
