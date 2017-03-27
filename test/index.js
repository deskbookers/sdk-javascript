import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
import moment from 'moment'
dotenv.load()


// Shopping cart
test('Initialise', async t => {
  const deskbookers = new Deskbookers({
    https: process.env.API_HTTPS === 'true',
    host: process.env.API_HOST
  })

  t.is(deskbookers.host, process.env.API_HOST)
})
