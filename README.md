# sdk-javascript
JavaScript SDK for Deskbookers API (WORK IN PROGRESS)

## Installation
```bash
npm install deskbookers
```

## Overview

```js
const Deskbookers = require('deskbookers')
const deskbookers = new Deskbookers()
```

Every resource can be accessed via the Deskbookers instance

```js
// Get a workplace
deskbookers.workplaces.list({...})
```
