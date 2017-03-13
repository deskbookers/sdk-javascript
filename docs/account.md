# Users

## `login(email, password)`
Retrieves a login token, if valid credentials are provided.

```js
const email = 's.jobs@example.com'
const password = 'm4c1nt0sh'
const { token } = await deskbookers.account.login(email, password)
```

### Arguments
Name | Type |Description | Required
--- | --- | --- | ---
email | String | User account email address | Yes
password | String | User account password | Yes

### Example response

```json
{
  "token": "$2a$04$038Bl0lYgwa37ejCTAtVhuanJAOuyHnHA.3UBjaDxvAdLB9Q6Au8W",
  "user": {
    "id": 10000,
    "name": "Steve Jobs",
    "email": "s.jobs@example.com"
  }
}
```

## `signup(params)`
Registers a new user and returns a login token.

```js
const { token } = await deskbookers.account.signup({
  firstName: 'Albert',
  lastName: 'Einstein',
  email: 'einstein@example.com',
  password: 'e=mc2'
})
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
firstName | String | User first name | Yes
lastName | String |User last name | Yes
email | String | User account email address | Yes
password | String | User account password | Yes

### Example response

```json
{
  "token": "$2a$04$038Bl0lYgwa37ejCTAtVhuanJAOuyHnHA.3UBjaDxvAdLB9Q6Au8W",
  "user": {
    "id": 10001,
    "name": "Albert Einstein",
    "email": "einstein@example.com"
  }
}
```

## `retrieve()`
Retrieves the current logged in user information.

```js
const user = await deskbookers.account.retrieve()
```

### Example response

```json
{
  "id": 10001,
  "name": "Albert Einstein",
  "email": "einstein@example.com",
}
```

## `contexts(params)`
Retrieves the contexts for the current account.

```js
const contexts = await deskbookers.account.contexts({
  query: 'cool',
  page: 1,
  supported: ['provider', 'venue']
})
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
query | String | Autocomplete value | No
page | Number | Pagination number (1 indexed) | No
supported | Array | Context type returned: 'provider' or 'venue'  | No

### Example response

```json
[{
  "type": "provider",
  "context": "p10001",
  "name": "Cool Provider",
}, {
  "type": "venue",
  "context": "v10001",
  "name": "Cool Venue",
}]
```
