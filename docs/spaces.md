# Spaces

## `retrieve(id)`
Retrieves a single space.

```js
const spaceId = 10303
await deskbookers.spaces.retrieve(spaceId)
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
id | Number | Space ID | Yes

## `urgency(id, params)`
Retrieves the urgency data for a workspace; the amount of visitors or bookings for a given date range.

Supply parameters as either an `Object`, or `Array` for multiple sets of data.

```js
const urgency = await deskbookers.spaces.urgency(12345, {
  type: 'visitors',
  city: 'amsterdam',
  start: Date,
  end: Date
})
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
id | Number | Space ID | Yes
params | `Array` or `Object` | Query options | Yes
