import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
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

test('Reporting a problem', async t => {
  const deskbookers = await client(true)

  const res = await deskbookers.actions.report({
    message: 'This function aint working!',
    category: 'Bugs',
    browser: 'IE6',
    page: '/home',
    context: 'Provider mode',
    extras: {
      day: 'It was on a sunday',
      weather: 'It was rainy'
    }
  })

  t.truthy(res)
})
