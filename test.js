require('dotenv').load()
const test = require('ava')
const Deskbookers = require('./src/index')

const deskbookers = new Deskbookers()

// Users
test('Login', async t => {
  await t.notThrows(deskbookers.users.login(
    process.env.TEST_EMAIL, process.env.TEST_PASSWORD
  ))
})
