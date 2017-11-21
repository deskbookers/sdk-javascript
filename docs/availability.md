# Availability

## `retrieve(params)`
Retrieve availability for a given venue and date range.

```js
await deskbookers.availability.retrieve({
  venueId: 12345,
  start: '2017-05-01',
  end: '2017-05-08'
})
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
venueId | Number | Venue ID | Yes
start | String | Start date (YYYY-MM-DD) | Yes
end | String | End date (YYYY-MM-DD), exclusive | Yes
noCache | Bool | Ignore cache | No

### Example response

```json
{
  "timezone": "Europe/Amsterdam",
  "businessHours": [
    {
      "dow": [1],
      "type": "open",
      "start": "09:00",
      "end": "18:00"
    }
  ],
  "spaces": [
    {
      "id": 1234,
      "title": "Some space",
      "events": [
        {
         "id": "b1234-0",
         "bookingId": 1234,
         "title": "John Doe",
         "description": "",
         "type": "booking",
         "start": "2017-05-31 13:00",
         "end": "2017-05-31 15:00",
         "bookingStart": "2017-05-31 13:00",
         "bookingEnd": "2017-05-31 15:00",
        }
      ]
    }
  ]
}
```

## `retrieveForFullCalendar(params)`
Retrieve fullcalendar availability for a given space and date range.

```js
await deskbookers.availability.retrieveForFullCalendar({
  spaceId: 12345,
  start: '2017-05-01',
  end: '2017-05-08'
})
```

### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
spaceId | Number | Space ID | Yes
start | String | Start date (YYYY-MM-DD) | Yes
end | String | End date (YYYY-MM-DD), exclusive | Yes
noCache | Bool | Ignore cache | No

### Example response

```json
[
  {
    "type": "closed",
    "start": 1508709600,
    "end": 1508742000
  },
  {
    "type": "onRequest",
    "start": 1508824800,
    "end": 1508828400
  },
  {
    "type": "occupied",
    "start": 1508868000,
    "end": 1508882400
  }
]
```
