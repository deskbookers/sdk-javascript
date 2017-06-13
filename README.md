# Deskbookers JavaScript SDK
JavaScript library to connect to the Deskbookers API. Available to use server-side or client-side, but you must bring your own `fetch` polyfill ([`fetch-everywhere`](https://github.com/lucasfeliciano/fetch-everywhere) recommended).

## Installation
```bash
npm install deskbookers
```

## Overview

```js
import 'fetch-everywhere'
import Deskbookers from 'deskbookers'

const deskbookers = new Deskbookers()
```

Every resource can be accessed via the Deskbookers instance:

```js
// deskbookers.{{ RESOURCE_NAME }}.{{ METHOD }}

// Get a workplace
deskbookers.workplaces.retrieve('workplaceId')
```

And every resource returns a [`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), so you can chain them together or use `async/await`:

```js

const workplaces = await deskbookers.workplaces.retrieve(params)
for (let workplace of workplaces) {
  // Use workplace data
}
```

### Available resources & methods

* account
  * [`login(email, password)`](docs/account.md#loginemail-password)
  * [`signup(params)`](docs/account.md#signupparams)
  * [`forgot(email)`](docs/account.md#forgotemail)
  * [`retrieve()`](docs/account.md#retrieve)
  * [`contexts(params)`](docs/account.md#contextsparams)
  * [`menu(context)`](docs/account.md#menucontext)
  * [`setLanguage(language)`](docs/account.md#setlanguagelanguage)
  * [`setTimezone(timezone)`](docs/account.md#settimezonetimezone)
  * [`preferences`](docs/account.md#preferences)
    * [`list(keys)`](docs/account.md#listkeys)
    * [`retrieve(key)`](docs/account.md#retrievekey)
    * [`update(params)`](docs/account.md#updateparams)
* actions
  * [`report(params)`](docs/actions.md#reportparams)
* availability
  * [`retrieve(params)`](docs/availability.md#retrieveparams)
* spaces
  * [`retrieve(id)`](docs/spaces.md#retrieveid)
  * [`urgency(id, params)`](docs/spaces.md#urgencyid-params)
* events
  * [`unread()`](docs/events.md#unread)
  * [`retrieve(tabId, limit)`](docs/events.md#retrievetabid-limit)
  * [`list(limit, offset, tags)`](docs/events.md#listlimit-offset-tags)
  * [`markAllAsRead(tags)`](docs/events.md#mark-all-as-read)
