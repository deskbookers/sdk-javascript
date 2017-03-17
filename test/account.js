import dotenv from 'dotenv'
import test from 'ava'
import Deskbookers from '../src'
import faker from 'faker'
dotenv.load()

const deskbookers = new Deskbookers({
  https: process.env.API_HTTPS === 'true',
  host: process.env.API_HOST
})

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD
} = process.env

test('Login', async t => {
  const login = await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  t.truthy(login.id)
})

test('Signup', async t => {
  const signup = await deskbookers.account.signup({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'p4ssw0rd'
  })
  t.truthy(signup.id)
})

test('Logout', async t => {
  // Login and store session
  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  t.truthy(deskbookers.session)

  // Logout
  await deskbookers.account.logout()
  t.is(deskbookers.session, null)
})

test('Retrieve', async t => {
  t.throws(deskbookers.account.retrieve())
  const login = await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  t.notThrows(deskbookers.account.retrieve())
})
