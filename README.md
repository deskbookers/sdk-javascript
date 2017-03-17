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

const workplaces = await deskbookers.workplaces.list(params)
for (let workplace of workplaces) {
  // Use workplace data
}
```

### Available resources & methods

* account
  * [`login(email, password)`](docs/account.md#loginemail-password)
  * [`signup(params)`](docs/account.md#signupparams)
  * [`retrieve()`](docs/account.md#retrieve)
  * [`contexts(params)`](docs/account.md#contextsparams)
* workplaces
  * `retrieve(workplaceId)`
* events
  * [`unread()`](docs/events.md#unread)
  * [`list(tabId, limit)`](docs/events.md#listparams)
