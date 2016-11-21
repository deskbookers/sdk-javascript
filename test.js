require('dotenv').load()
const test = require('ava')
const Deskbookers = require('./src/index')

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
