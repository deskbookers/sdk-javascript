
import dotenv from 'dotenv'
import { get } from 'lodash'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  API_PAYMENTS_HOST,
  API_PAYMENTS_PATH,
  API_HTTPS,
  API_HOST
} = process.env

async function client (login = false) {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      payments: {
        host: API_PAYMENTS_HOST,
        path: API_PAYMENTS_PATH
      }
    }
  })

  if (login) {
    await deskbookers.account.login(LOGIN_EMAIL, LOGIN_PASSWORD)
  }
  return deskbookers
}

test('payments invoices list', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.invoices.list({})
  t.truthy(data)
})

test('payments invoices list', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.invoices.get(
    {invoiceId: 'in_1AmlLiGAwNnYLy52pW4WN9p1'}
  )
  t.truthy(data)
})

test('payments plans list', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.plans.list({})
  t.truthy(data)
})

test('payments plan', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.plans.get(
    {planId: 'bookingTool-9900-1x-month-0'}
  )
  t.truthy(data)
})

test('payments subscriptions plan', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.plans.subscriptions(
    {planId: 'bookingTool-9900-1x-month-0'}
  )
  t.truthy(data)
})

test('payments subscriptions list', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.subscriptions.list({limit: 1, status: 'active'})
  t.truthy(data)
})

test('payments get subscription', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.subscriptions.get({subscriptionId: 'sub_B93SRrYAV6KF7V'})
  t.truthy(data)
})

test('payments user', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.get(
    {userId: 'rb5'}
  )
  t.truthy(data)
})

test('payments user subscriptions', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.subscriptions({
    userId: 'rb5'
  })
  t.truthy(data)
})

test('payments user invoices', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.invoices({
    userId: 'rb5'
  })
  t.truthy(data)
})

test('payments user payments', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.payments({
    userId: 'rb5'
  })
  t.truthy(data)
})

test('payments create user', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.upsert({
    userId: 'rb6',
    user: {email: 'lomoa@lamao.comoa'}
  })
  t.truthy(data)
})

test('payments create source for user', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.createSource({
    userId: 'rb6',
    token: 'tok_br',
    email: 'lomoa@lamao.comoa',
    setDefault: true
  })
  t.truthy(data)
})

test('payments create subscriptions for user', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.createSubscription({
    userId: 'rb6',
    subscription: {
      currency: 'eur',
      userUid: 'features',
      interval: { period: 'month', count: 1 },
      email: 'rafa@del.cc',
      vat: 21,
      plans: [
        {
          feature: 'basic',
          name: 'Deskbookers for Partners Basic',
          amount: 10.0
        },
        {
          feature: 'bookingTool',
          name: 'Booking tool',
          amount: 99.0
        }
      ]
    }
  })

  t.truthy(data)
  t.is(get(data, 'meta.userUid'), 'rb6-features')
})

test('payments create charge for user', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.createCharge({
    userId: 'rb6',
    charge: {
      email: 'test@email.domain',
      amount: 1,
      currency: 'eur',
      description: 'Pay dude!',
      source: 'card_1An6aVGAwNnYLy52pblSpdCQ',
      meta: { a: 1, b: 2 }
    }
  })
  t.truthy(data)
})

test('list user sources', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.listSources({
    userId: 'rb5',
    limit: 1
  })
  t.truthy(data)
})

test('delete user source', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  // Create a source
  const source = await deskbookers.payments.users.createSource({
    userId: 'rb5',
    token: 'tok_br',
    email: 'lomoa@lamao.comoa',
    setDefault: true
  })

  const data = await deskbookers.payments.users.deleteSource({
    userId: 'rb5',
    sourceId: source.id
  })
  t.truthy(data)
})

test('set user source source', async t => {
  // Prepare API
  const deskbookers = await client(true)
  t.truthy(deskbookers.session)

  const data = await deskbookers.payments.users.setDefaultSource({
    userId: 'rb5',
    sourceId: 'src_1AmleQGAwNnYLy52BVGHaUfn'
  })
  t.truthy(data)
})
