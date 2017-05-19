# Account

## `login(email, password)`
Validates given login credentials and sets the authentication tokens to `deskbookers.session`, enabling future authenticated requests.

```js
const email = 's.jobs@apple.com'
const password = 'm4c1nt0sh'
const user = await deskbookers.account.login(email, password)
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
email | String | User account email address | Yes
password | String | User account password | Yes

#### Example response

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
  firstName: 'Steve',
  lastName: 'Jobs',
  email: 's.jobs@apple.com',
  password: 'm4c1nt0sh'
})
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
firstName | String | User first name | Yes
lastName | String |User last name | Yes
email | String | User account email address | Yes
password | String | User account password | Yes

#### Example response

```json
{
  "id": 10000,
  "fullName": "Steve Jobs",
  "firstName": "Steve",
  "lastName": "Jobs",
  "email": "s.jobs@apple.com",
  "country": "United States of America"
}
```

## `forgot(email)`
Resets the users password and sends an email with a reset link. Will throw an `Error` on bad requests/responses. Always returns true.

```js
const email = 's.jobs@apple.com'
const res = await deskbookers.account.forgot(email)
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
email | String | Email address | Yes


## `retrieve()`
Retrieves the current logged in user information.

```js
const user = await deskbookers.account.retrieve()
```

#### Example response

```json
{
  "id": 10000,
  "fullName": "Steve Jobs",
  "firstName": "Steve",
  "lastName": "Jobs",
  "email": "s.jobs@example.com",
  "country": "United States of America"
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

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
query | String | Autocomplete value | No
page | Number | Pagination number (1 indexed) | No
supported | Array | Context type returned: 'provider' or 'venue'  | No

#### Example response

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

## `menu(context)`
Retrieves the menu structure for the current account and given context.

```js
const context = contexts[0].context
const menu = await deskbookers.account.menu(context)
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
context | String | Context code | Yes

#### Example response
```json
{
  "top": [{
    "id": "events",
    "title": "Notifications",
    "route": null,
    "params": {},
    "url": null,
    "sidebar": [{
      "id": "event-tab",
      "title": "Gebeurtenissen",
      "route": "events",
      "params": {
        "eventTabId": 1
      },
      "url": "http://example.org/events/1",
      "unread": 583409
    }]
  }, {
    "id": "settings",
    "title": "Settings",
    "route": null,
    "params": {},
    "url": null,
    "sidebar": [{
      "id": "venue-details",
      "title": "Venue details",
      "route": null,
      "params": {},
      "url": null,
      "tabs": [{
        "id": "location-edit",
        "title": "Venue details",
        "route": "location-edit",
        "params": {
          "groupID": 37711
        },
        "url": "http://example.org/location/37711/edit"
      }, {
        "id": "location-timesettings",
        "title": "Time settings",
        "route": "location-timesettings",
        "params": {
          "groupID": 37711
        },
        "url": "http://example.org/location/37711/timeSettings"
      }]
    }]
  }],
  "user": [{
    "id": "account-edit",
    "title": "Account details",
    "route": "account-edit",
    "params": {},
    "url": "http://example.org/account/edit"
  }, {
    "id": "logout",
    "title": "Logout",
    "route": "logout",
    "params": {},
    "url": "http://example.org/logout"
  }]
}
```

## `setLanguage(language)`
Store user language.

```js
await deskbookers.account.setLanguage('en-gb')
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
language | String | Language code | Yes

#### Example response
```json
true
```

## `setTimezone(timezone)`
Store user timezone.

```js
await deskbookers.account.setTimezone('Europe/Amsterdam')
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
timezone | String | Timezone | Yes

#### Example response
```json
true
```

## `preferences`
This sub-resource handles user account preferences.

### `list(keys)`

Returns a `Map` of account preferences. Specify an array of keys to return, or omit to return all.

```js
// Get subset of keys
const keys = ['city', 'country', 'language', 'timezone']
await deskbookers.account.preferences.list(...keys)

// Get all
await deskbookers.account.preferences.list()
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
keys | Array | List of keys to retrieve | No


#### Example response

```js
Map {
  'city' => 'Amsterdam',
  'country' => 'Netherlands',
  'language' => 'nl-nl',
  'timezone' => 'Europe/Amsterdam'
}
```

### `retrieve(key)`

Retrieves the account preference value for the supplied key.

```js
const city = await deskbookers.account.preferences.retrieve('city')
console.log(city) // 'Amsterdam'
```

### `update(params)`

Accepts an object of key/values to update. Returns a `Map` of all preferences.

```js
const preferences = deskbookers.account.preferences

const prefs = await preferences.update({
  city: 'London',
  country: 'United Kingdom',
  timezone: 'Europe/London',
  language: 'en-gb'
})

prefs.get('country') // 'United Kingdom'
```

#### Example response
```js
Map {
  "city": "London",
  "country": "United Kingdom",
  "language": "en-gb",
  "timezone": "Europe/London"
}
```
