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
// test('Login', async t => {
//   await t.notThrows(deskbookers.users.login(
//     process.env.LOGIN_EMAIL,
//     process.env.LOGIN_PASSWORD
//   ))
// })

// test('Signup', async t => {
//   await t.notThrows(deskbookers.users.signup({
//     firstName: process.env.SIGNUP_FIRST_NAME,
//     lastName: process.env.SIGNUP_LAST_NAME,
//     email: process.env.SIGNUP_EMAIL,
//     password: process.env.SIGNUP_PASSWORD
//   }))
// })

test('Validate public key', async t => {
  // Login
  await deskbookers.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )
  console.log(await deskbookers.validateSession())
  console.log(await deskbookers.users.current())
})

// Test shopping cart
// test('Cart 1', async t => {
//   // Login
//   await deskbookers.login(
//     process.env.LOGIN_EMAIL,
//     process.env.LOGIN_PASSWORD
//   )

//   // Test cart
//   const space = deskbookers.cart.addSpace({
//     id: 13235,
//     start: moment('2016-12-30 12:00'),
//     end: moment('2016-12-30 14:00')
//   })
//   space.addProduct({
//     id: 10469
//   })
//   await deskbookers.cart.refresh()

//   t.is(deskbookers.cart.available(), true)

//   for (let key in deskbookers.cart.spaces()) {
//     const space = deskbookers.cart.getSpace(key)

//     console.log(space)

//     console.log(
//       `${space.start().format('YYYY-MM-DD HH:mm')} - ${space.end().format('YYYY-MM-DD HH:mm')} ::`,
//       `${space.available() ? 'available' : 'unavailable'} ::`,
//       `${space.meta().name} - ${space.meta().location_name}`
//     )
//   }
//   console.log('Possible vouchers:', deskbookers.cart.possibleVouchers())
// })
