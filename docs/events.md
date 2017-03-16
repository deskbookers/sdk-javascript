# Events

## `unread()`
Retrieves the unread count of the events, and returns a breakdown of unread counts by tab.

```js
const unread = await deskbookers.events.unread()
```

### Example response

```json
{
  "total": 25,
  "tabs": [{
    "id": 1,
    "name": "First tab",
    "unread": 22
  }]
}
```

## `list(tabId, limit)`
Lists the events for a given tab `id`. Returns an [async generator](https://github.com/tc39/proposal-async-iteration), or throws and `Error` if no events are returned.

```js
const tabId = 22
const eventsLimit = 10
const eventsIterator = deskbookers.events.list(tabId, eventsLimit)


// Use async generator directly
const firstBatch = await eventsIterator.next()
firstBatch.value.length // 10

// Iterate over all
for await (let currentBatch of eventsIterator) {
  console.log(currentBatch.length) // 10
}
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
tabId | Number | Tab id | Yes
eventsLimit | Number | Amount of events to return | Yes
