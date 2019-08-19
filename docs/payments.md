# Payments


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

## `users.createSetupIntent()`
Create setup Intent object for Stripe payments

```js
  const data = await deskbookers.payments.users.createSetupIntent()
```