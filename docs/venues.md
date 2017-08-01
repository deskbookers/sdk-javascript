# Venues

## `retrieve(venueId, { fields, params })`
Retrieves a single venue.

```js
const venueId = 11710
const fields = ['id', 'image_urls']
const params = { width: 360, height: 240 }
await deskbookers.venues.retrieve(venueId, { fields, params })
```

#### Arguments
Name | Type | Description | Required
--- | --- | --- | ---
venueId | Number | Venue ID | Yes
fields | Array|Object | Fields whitelist | No
params | Object | Extra arguments | No

## `savePaymentSettings(venueId, params)`
Retrieves the payment settings data for a venue.

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
params | `Object` | PaymentSettings | Yes
