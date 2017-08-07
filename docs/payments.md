# Payments

## `invoices.list({limit, lastId})`
List all avaiable invoices for a given `limit`, `lastId`

#### Params

| Name    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| limit   | int    | No       | Limit results per request |
| lastId  | string | No       | Used for Pagination       |

```js
const data = await deskbookers.payments.invoices.list({})
```

## `invoices.get({invoiceId})`
List all avaiable invoices for a given `invoiceId`

#### Params

| Name      | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| invoiceId | int    | Yes      | Invoice Id              |

```js
const data = await deskbookers.payments.invoices.get(
  {invoiceId: 'in_1AmlLiGAwNnYLy52pW4WN9p1'}
)
```

## `plans.list({limit, lastId})`
List all avaiable plans for a given `limit`, `lastId`

#### Params

| Name    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| limit   | int    | No       | Limit results per request |
| lastId  | string | No       | Used for Pagination       |

```js
const data = await deskbookers.payments.plans.list({})
```

## `plans.get({planId})`
List all avaiable plans for a given `planId`

#### Params

| Name      | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| planId    | int    | Yes      | Plan Id                 |

```js
const data = await deskbookers.payments.plans.get(
  {planId: 'bookingTool-9900-1x-month-0'}
)
```

## `plans.subscriptions({planId})`
List all avaiable subscriptions for a given `planId`

#### Params

| Name      | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| planId    | int    | Yes      | Plan Id                 |

```js
const data = await deskbookers.payments.plans.get(
  {planId: 'bookingTool-9900-1x-month-0'}
)
```

## `subscriptions.list({limit, lastId, status})`
List all avaiable subscriptions for a given `limit`, `lastId` and `status`

#### Params

| Name    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| limit   | int    | No       | Limit results per request |
| lastId  | string | No       | Used for Pagination       |
| status  | string | No       | Used for filtering        |

```js
const data = await deskbookers.payments.subscriptions.list(
  {limit: 1, status: 'active'}
)
```

## `subscriptions.get({subscriptionId})`
Get subscription for a given `subscriptionId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| subscriptionId | int    | Yes      | Subscription Id     |

```js
const data = await deskbookers.payments.subscriptions.get(
  {subscriptionId: 'sub_B93SRrYAV6KF7V'}
)
```

## `users.get({userId})`
Get user for a given `userId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |

```js
const data = await deskbookers.payments.users.get(
  {userId: 'rb5'}
)
```

## `users.subscriptions({userId})`
Get user subscriptions for a given `userId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |

```js
const data = await deskbookers.payments.users.subscriptions(
  {userId: 'rb5'}
)
```

## `users.invoices({userId})`
Get user invoices for a given `userId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |

```js
const data = await deskbookers.payments.users.invoices(
  {userId: 'rb5'}
)
```

## `users.payments({userId})`
Get user payments for a given `userId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |

```js
const data = await deskbookers.payments.users.payments(
  {userId: 'rb5'}
)
```

## `users.upsert({userId, user})`
Create / Update user payments for a given `userId` and `user`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |
| user           | object | Yes      | User Object         |

#### User

| Name          | Type   | Required | Description         |
| ------------- | ------ | -------- | ------------------- |
| email         | string | Yes      | User email          |
| description   | string | No       | User description    |
| metadata      | object | No       | User metadata       |

```js
const data = await deskbookers.payments.users.upsert({
  userId: 'rb6',
  user: {email: 'lomoa@lamao.comoa'}
})
```

## `users.createSource({userId, token, email, setDefault})`
Create source for a given `userId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |
| token          | object | Yes      | Source Token        |
| email          | string | No       | Source email        |
| setDefault     | bool   | No       | Source is default   |

```js
const data = await deskbookers.payments.users.createSource({
  userId: 'rb6',
  token: 'tok_br',
  email: 'lomoa@lamao.comoa',
  setDefault: true
})
```

## `users.createSubscription({userId, subscription})`
Create subscriptions for a given `userId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |
| subscription   | object | Yes      | Subscription Object |

#### Subscription

| Name          | Type   | Required | Description           |
| ------------- | ------ | -------- | --------------------- |
| currency      | string | Yes      | Subscription currency |
| userUid       | string | Yes      | Origin of 'features'  |
| interval      | object | Yes      | Subscription interval |
| email         | string | Yes      | Subscription email    |
| vat           | int    | Yes      | Subscription vat      |
| plans         | object | Yes      | Subscription Plans    |

#### Interval

| Name        | Type   | Required | Description             |
| ----------- | ------ | -------- | ----------------------- |
| period      | string | Yes      | Interval period         |
| count       | int    | Yes      | Interval count          |

#### plans

| Name        | Type   | Required | Description             |
| ----------- | ------ | -------- | ----------------------- |
| feature     | string | Yes      | Plans feature           |
| name        | string | Yes      | Plans name              |
| amount      | float  | Yes      | Plans amount            |


```js
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
```

## `users.createCharge({userId, charge})`
Create a charge for a given `userId` and `charge`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| userId         | string | Yes      | User Id             |
| charge         | object | Yes      | User Object         |

#### Charge

| Name          | Type   | Required | Description         |
| ------------- | ------ | -------- | ------------------- |
| email         | string | Yes      | Charge email        |
| amount        | int    | Yes      | Charge Amount       |
| currency      | string | Yes      | Charge currency     |
| description   | string | Yes      | Charge description  |
| source        | string | Yes      | Charge source id    |
| metadata      | object | Yes      | Charge metadata     |

```js
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
```

## `users.listSources({userId, limit, lastId})`
List sources for a given `userId`

#### Params

| Name    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| userId  | string | Yes      | User Id                   |
| limit   | int    | No       | Limit results per request |
| lastId  | string | No       | Used for Pagination       |


```js
  const data = await deskbookers.payments.users.listSources({
    userId: 'rb5',
    limit: 10
  })
```

## `users.deleteSource({userId, sourceId})`
List sources for a given `userId`

#### Params

| Name     | Type   | Required | Description               |
| -------- | ------ | -------- | ------------------------- |
| userId   | string | Yes      | User Id                   |
| sourceId | string | No       | Used for Pagination       |


```js
  const data = await deskbookers.payments.users.deleteSource({
    userId: 'rb5',
    sourceId: 'src_1AmliGGAwNnYLy52m399REmA'
  })
```

## `users.setDefaultSource({userId, sourceId})`
Set source as default for a given `userId`

#### Params

| Name     | Type   | Required | Description               |
| -------- | ------ | -------- | ------------------------- |
| userId   | string | Yes      | User Id                   |
| sourceId | string | No       | Used for Pagination       |


```js
  const data = await deskbookers.payments.users.setDefaultSource({
    userId: 'rb5',
    sourceId: 'src_1AmleQGAwNnYLy52BVGHaUfn'
  })
```