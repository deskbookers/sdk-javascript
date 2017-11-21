# Reports

## Bookings

## `bookings.enquire({venueId, type, start, end, task})`
Get booking reports for a given `venueId`

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| venueId        | int    | Yes      | Venue Id            |
| type           | string | Yes      | Report type         |
| start          | string | Yes      | Date 'YYYY-MM-DD'   |
| end            | string | Yes      | Date 'YYYY-MM-DD'   |
| task           | bool   | No       | Req. async process  |

```js
const data = await deskbookers.reports.bookings.enquire({
  venueId: 39418,
  type: 'month_overview',
  start: '2017-09-01',
  end: '2017-11-01',
  task: true
})
```

## `bookings.retrieve({venueId, type, jobId})`
Get async booking reports for a given `venueId` and `jobId`, 
if `task` was sent as `true` on `booking.enquire`, an `jobId` 
is returned and when passed to `retrieve` it will get the actual
processing state and return the percentage, status and the actual 
data if available.

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| venueId        | int    | Yes      | Venue Id            |
| type           | string | Yes      | Report type         |
| jobId          | int    | Yes      | Async job id        |

```js
const data = await deskbookers.reports.bookings.retrieve({
  venueId: 39418,
  type: 'month_overview',
  jobId: 13
})
```
