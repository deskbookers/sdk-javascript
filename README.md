# sdk-javascript
JavaScript SDK for Deskbookers API (WORK IN PROGRESS)

## Installation
```bash
npm install deskbookers
```

## Overview

```js
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

 * users
  * [`login(email, password)`](docs/users.md#loginemail-password)
 * workplaces
  * `retrieve(workplaceId)`
