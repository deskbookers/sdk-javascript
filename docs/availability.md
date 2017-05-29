# Availability

## `list(params)`
Receive availability for a given venue and date range.

```js
await deskbookers.availability.list({
  venueId: 12345,
  start: '2017-05-01',
  end: '2017-05-08'
})
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
venueId | Number | Venue ID | Yes
start | String | Start date (YYYY-MM-DD) | Yes
end | String | End date (YYYY-MM-DD), exclusive | Yes
noCache | Bool | Ignore cache | No

#### Example response

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
