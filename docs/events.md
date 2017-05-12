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

## `retrieve(tabId, limit)`
Lists the events for a given tab `id`. Returns an [async generator](https://github.com/tc39/proposal-async-iteration), or throws and `Error` if no events are returned.

```js
const tabId = 1
const eventsLimit = 10
const eventsIterator = deskbookers.events.retrieve(tabId, eventsLimit)


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

## `list(limit, offset, tags)`
Gets all the events for a specific user, if only events of certain type where to be required you can specify them in the tags array.

```js
// gets the first page of results of all the events with the tag 'booking'
const res = await deskbookers.events.getAllEvents(30, 0, ['booking'])
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
limit | Number | Tab id | Yes
offset | Number | Tab id | Yes
tags | Array | Tags to filter the results | No

## `markAllAsRead(tags)`
Gets all the events for a specific user, if only events of certain type where to be required you can specify them in the tags array.

```js
// mark all events with the tag 'booking' as read
const res = await deskbookers.events.markAllAsRead(['booking'])
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
tags | Array | Tags to filter the results | No
