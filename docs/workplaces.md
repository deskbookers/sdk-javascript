# Workplaces

## `urgency(id, params)`
Retrieves the urgency data for a workspace; the amount of visitors or bookings for a given date range.

Supply parameters as either an `Object`, or `Array` for multiple sets of data.

```js
const urgency = await deskbookers.account.login(12345, {
  type: 'visitors',
  city: 'amsterdam',
  start: Date,
  end: Date
})
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
id | Number | Workplace ID | Yes
params | `Array` or `Object` | Query options | Yes
