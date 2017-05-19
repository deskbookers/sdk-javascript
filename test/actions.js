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

test('Reporting a problem', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const res = await deskbookers.actions.report(
    message: 'This function aint working!',
    category: 'Bugs',
    browser: 'IE6',
    page: '/home',
    context: 'Provider mode',
    extras: [
      'day' => 'It was on a sunday',
      'weather' => 'It was on a rainy'
    ]
  )

  t.truthy(res)
})
