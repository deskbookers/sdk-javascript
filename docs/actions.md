# Actions

## `report(params)`
Reports a problem to Deskbookers.

```js
await deskbookers.actions.report({
  message: 'This function aint working!',
  category: 'Bugs',
  browser: 'IE6',
  page: '/home',
  context: 'Provider mode',
  extras: [
    'day' => 'It was on a sunday',
    'weather' => 'It was rainy'
  ]
})
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
message | String | Problem message | Yes
category | String | Problem category | Yes
browser | String | Browser the problem occured in | Yes
page | String | Page the problem occured | Yes
context | String | Context in which problem occured | Yes
extras | Array | Extra information about problem | No

### Example response

```json
true
```
