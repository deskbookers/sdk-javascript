import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
import moment from 'moment'
dotenv.load()

const deskbookers = new Deskbookers({
  https: process.env.API_HTTPS === 'true',
  host: process.env.API_HOST
})

// Shopping cart
test('Test cart availability', async t => {
  const cart = await prepareCart(t)

  t.true(cart.available())

  // TODO: test more
})
const prepareCart = async (t) => {
  try {
    // Login
    await deskbookers.account.login(
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
    t.fail(`Error while preparing cart: ${(e && e.message) || 'Exception occurred'}`)
    return deskbookers.cart
  }
}
