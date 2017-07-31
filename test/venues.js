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

test('get financial settings', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  const paymentSettings = await deskbookers.venues.getPaymentSettings(11710)
  console.log(paymentSettings)
  t.truthy(paymentSettings)
})

test('save financial settings', async t => {
  const deskbookers = client()

  await deskbookers.account.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  )

  let payment = { 
    name: 'aaa222',
    bankInfo: 'NL01BANK012345222',
    bic: 'ABCDEF22',
    tax: '1234222',
    company: 'hockerson2',
    debtor: '1234522',
    mark: 'rarara22',
    address:
    { country: 'The Netherlands',
      addressLine1: 'a2',
      postalcode: '2222AK',
      place: 'lolala2',
      telephonenumber: '+31610512222',
      telephonenumber2: '+31123412222',
      email: 'e2@e2.c2' 
    }
  }
  const saved = await deskbookers.venues.savePaymentSettings(11710, payment)
  const paymentSettings = await deskbookers.venues.getPaymentSettings(11710)

  t.truthy(saved)
})
