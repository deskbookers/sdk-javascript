import dotenv from 'dotenv'
import test from 'ava'
import Deskbookers from './src'

const apiOptions = [(process.env.API_HTTPS === 'true'), process.env.API_HOST]
const deskbookers = new Deskbookers(...apiOptions)

// Users
test('Login', async t => {
  await t.notThrows(deskbookers.users.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  ))
})

test('Signup', async t => {
  await t.notThrows(deskbookers.users.signup({
    firstName: process.env.SIGNUP_FIRST_NAME,
    lastName: process.env.SIGNUP_LAST_NAME,
    email: process.env.SIGNUP_EMAIL,
    password: process.env.SIGNUP_PASSWORD
  }))
})

// Test shopping cart
test('ShoppingCart', async t => await t.notThrows(async () => {
  const cart = deskbookers.cart
  cart.addSpace({id: 13235})
  await cart.refresh()

  console.log(cart.data)
}))
