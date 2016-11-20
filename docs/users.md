# Users

## `login(email, password)`
Retrieves a login token, if valid credentials are provided.

```
const { token } = await deskbookers.users.login(username, password)
```

### Example response

```js
{
  "token": "$2a$04$038Bl0lYgwa37ejCTAtVhuanJAOuyHnHA.3UBjaDxvAdLB9Q6Au8W",
  "user": {
    "id": 10000,
    "name": "Foo Bar",
    "email": "user@example.com"
  }
}
```
