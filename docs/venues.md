# Venues

## `getPaymentSettings(venueId)`
Retrieves a single space.

```js
const venueId = 11710
await deskbookers.venues.getPaymentSettings(venueId)
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
id | Number | Venue ID | Yes

## `savePaymentSettings(venueId, params)`
Retrieves the payment settings data for a venue.

```js
await deskbookers.venues.savePaymentSettings(11710, {
  name: 'aaa',
  bankInfo: 'NL01BANK012345678',
  bic: 'ABCDEF01',
  tax: '1234',
  company: 'hockerson',
  debtor: '12345',
  mark: 'rarara',
  address:
   { country: 'The Netherlands',
     addressLine1: 'a',
     postalcode: '1012AK',
     place: 'lolala',
     telephonenumber: '+31610513231',
     telephonenumber2: '+31123412345',
     email: 'e@e.c' 
   }
})
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
id | Number | Venue ID | Yes
params | `Array` or `Object` | Query options | Yes
