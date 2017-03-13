# Users

## `login(email, password)`
Retrieves a login token, if valid credentials are provided.

```js
const email = 's.jobs@example.com'
const password = 'm4c1nt0sh'
const { token } = await deskbookers.users.login(email, password)
```

### Arguments
Name | Description | Required
--- | --- | ---
email | User account email address | Yes
password | User account password | Yes

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
const { token } = await deskbookers.users.signup({
  firstName: 'Albert',
  lastName: 'Einstein',
  email: 'einstein@example.com',
  password: 'e=mc2'
})
```

### Arguments
Name | Description | Required
--- | --- | ---
firstName | User first name | Yes
lastName | User last name | Yes
email | User account email address | Yes
password | User account password | Yes

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
Retrieves the current logged in user.

```js
const user = await deskbookers.users.retrieve()
```

### Example response

```json
{
  "id": 10001,
  "name": "Albert Einstein",
  "email": "einstein@example.com",
}
```
