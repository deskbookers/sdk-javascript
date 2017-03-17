# Account

## `login(email, password)`
Validates given login credentials and sets the authentication tokens to `deskbookers.session`, enabling future authenticated requests.

```js
const email = 's.jobs@example.com'
const password = 'm4c1nt0sh'
const user = await deskbookers.account.login(email, password)
```

### Arguments
Name | Type |Description | Required
--- | --- | --- | ---
email | String | User account email address | Yes
password | String | User account password | Yes

### Example response

```json
{
  "id": 10000,
  "fullName": "Steve Jobs",
  "firstName": "Steve",
  "lastName": "Jobs",
  "email": "s.jobs@example.com"
}
```

## `signup(params)`
Registers a new user and returns newly-created user object. Will throw an `Error` on bad requests/responses.

```js
const user = await deskbookers.account.signup({
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
  "id": 10001,
  "fullName": "Albert Einstein",
  "firstName": "Albert",
  "lastName": "Einstein",
  "email": "einstein@example.com",
  "country": "Germany"
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
  "fullName": "Albert Einstein",
  "firstName": "Albert",
  "lastName": "Einstein",
  "email": "einstein@example.com",
  "country": "Germany"
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
