import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import moment from 'moment'
import Deskbookers from '../src'
dotenv.load()

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })

  if (login) {
    await deskbookers.account.login(
      process.env.LOGIN_EMAIL,
      process.env.LOGIN_PASSWORD
    )
  }
  return deskbookers
}

test('Get active terms', async t => {
  const deskbookers = await client(true)

  const terms = await deskbookers.termsAndConditions.listActive()
  console.log('active', terms)
})

test('Get pending terms by user', async t => {
  const deskbookers = await client(true)

  const terms = await deskbookers.termsAndConditions.userPending(49889)
  console.log('user pending', terms)
})

test('Get accepted terms by user', async t => {
  const deskbookers = await client(true)

  const terms = await deskbookers.termsAndConditions.userAccepted(49889)
  console.log('user accepted', terms)
})

//test('Post accepted terms by user', async t => {
  //const deskbookers = await client(true)

  //const ok = await deskbookers.termsAndConditions.userAccept({
    //userId: 49889,
    //tcId: 7
  //})
  //console.log('user accepted', ok)
//})

test('Get pending terms by venue', async t => {
  const deskbookers = await client(true)

  const terms = await deskbookers.termsAndConditions.venuePending(11707)
  console.log('venue pending', terms)
})

test('Get accepted terms by venue', async t => {
  const deskbookers = await client(true)

  const terms = await deskbookers.termsAndConditions.venueAccepted(11707)
  console.log('venue accepted', terms)
})

//test('Post accepted terms by venue', async t => {
  //const deskbookers = await client(true)

  //const ok = await deskbookers.termsAndConditions.venueAccept({
    //venueId: 11707,
    //tcId: 11
  //})
  //console.log('venue accepted', ok)
//})
