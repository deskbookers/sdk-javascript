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

Every resource returns a [`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), therefore are chainable:

```js
deskbookers.workplaces.list(params)
  .then(workplaces => {
    const workplaceId = workplaces[0].id
    return deskbookers.workplaces.retrieve(workplaceId)
  })
  .then(workplace => handleWorkplaceData)
  .catch(err => handleError)
  ```

### Available resources & methods

 * workplaces
  * `retrieve(workplaceId)`
