# Reports

## Bookings

### `bookings.enquire({venueId, type, start, end, task})`

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

### `bookings.retrieve({venueId, type, jobId})`

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

## Booking referrers

### `bookingReferrers.enquire({start, end, autoResolve})`

Get booking referrers report for a given date range.

#### Params

| Name        | Type   | Required | Description                              |
| ----------- | ------ | -------- | ---------------------------------------- |
| start       | string | No       | Only consider data after this start date |
| end         | string | No       | Only consider data untul this end date   |
| autoResolve | bool   | No       | Auto retrieve the result of the report and return everything as a promise (enabled by default) |

```js
const data = await deskbookers.reports.bookingReferrers.enquire({
  start: '2017-09-01'
})
console.log(data.url) // URL to download the report
```

### `bookingReferrers.retrieve({jobId})`

Get async booking referrers reports for a given `jobId`.

#### Params

| Name           | Type   | Required | Description         |
| -------------- | ------ | -------- | ------------------- |
| jobId          | int    | Yes      | Async job id        |

```js
const { jobInfo } = await deskbookers.reports.bookingReferrers.enquire({
  start: '2017-09-01',
  autoResolve: false
})
let data
do {
  data = await deskbookers.reports.bookingReferrers.retrieve({
    jobId: jobInfo.id
  })
} while (data.jobInfo.state !== 'complete' && data.jobInfo.state !== 'failed');
console.log(data.url)
```
