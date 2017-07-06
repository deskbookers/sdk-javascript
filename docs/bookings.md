# Bookings

## `month(date, venueId)`
Retrieve month bookings for a given venueId and date (only month & year used)

```js
await deskbookers.bookings.month(
  date,
  venueId
)
```
#### Example response
```json
[
  {
    "bookingId": 262655,
    "bookerId": 21403,
    "bookerName": "Bureau Voorlichting Binnenvaart",
    "resellerId": 10000,
    "resellerName": "Deskbookers.com",
    "bookerGroupId": null,
    "bookerGroupName": null,
    "start": "2017-06-13T10:30:00+02:00",
    "end": "2017-06-13T12:30:00+02:00",
    "items": [
      {
        "name": "Vergaderruimte E1",
        "price": 0,
        "vat": 21,
        "quantity": 1
      },
      {
        "name": "Waterkan en glazen",
        "price": 0,
        "vat": 0,
        "quantity": 1
      },
      {
        "name": "Theekan",
        "price": 5.66,
        "vat": 6,
        "quantity": 1
      },
      {
        "name": "Koffiekan",
        "price": 14.16,
        "vat": 6,
        "quantity": 2
      }
    ]
  },
  {
    "bookingId": 264346,
    "bookerId": 28106,
    "bookerName": "Mevr. Wendela Andreae",
    "resellerId": 10000,
    "resellerName": "Deskbookers.com",
    "bookerGroupId": null,
    "bookerGroupName": null,
    "start": "2017-06-09T12:00:00+02:00",
    "end": "2017-06-09T15:00:00+02:00",
    "items": [
      {
        "name": "Vergaderruimte E1",
        "price": 0,
        "vat": 21,
        "quantity": 1
      }
    ]
  }
] 
```