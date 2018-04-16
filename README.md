# Deskbookers JavaScript SDK
JavaScript library to connect to the [Deskbookers](https://www.deskbookers.com/) API. Available to use server-side or client-side, but you must bring your own `fetch` polyfill ([`fetch-everywhere`](https://github.com/lucasfeliciano/fetch-everywhere) recommended).

## Installation
```bash
npm install deskbookers
```

## Overview

```js
import 'fetch-everywhere'
import Deskbookers from 'deskbookers'

const deskbookers = new Deskbookers()
```

Every resource can be accessed via the Deskbookers instance:

```js
// deskbookers.{{ RESOURCE_NAME }}.{{ METHOD }}

// Get a workplace
deskbookers.workplaces.retrieve('workplaceId')
```

And every resource returns a [`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), so you can chain them together or use `async/await`:

```js

const workplaces = await deskbookers.workplaces.retrieve(params)
for (let workplace of workplaces) {
  // Use workplace data
}
```

### Available resources & methods

* account
  * [`login(email, password)`](docs/account.md#loginemail-password)
  * [`signup(params)`](docs/account.md#signupparams)
  * [`forgot(email)`](docs/account.md#forgotemail)
  * [`retrieve()`](docs/account.md#retrieve)
  * [`contexts(params)`](docs/account.md#contextsparams)
  * [`menu(context)`](docs/account.md#menucontext)
  * [`setLanguage(language)`](docs/account.md#setlanguagelanguage)
  * [`setTimezone(timezone)`](docs/account.md#settimezonetimezone)
  * [`preferences`](docs/account.md#preferences)
    * [`list(keys)`](docs/account.md#listkeys)
    * [`retrieve(key)`](docs/account.md#retrievekey)
    * [`update(params)`](docs/account.md#updateparams)
* actions
  * [`report(params)`](docs/actions.md#reportparams)
* availability
  * [`retrieve(params)`](docs/availability.md#retrieveparams)
  * [`retrieveForFullCalendar(params)`](docs/availability.md#retrieveforfullcalendarparams)
* spaces
  * [`retrieve(id)`](docs/spaces.md#retrieveid)
  * [`urgency(id, params)`](docs/spaces.md#urgencyid-params)
* events
  * [`unread()`](docs/events.md#unread)
  * [`retrieve(tabId, limit)`](docs/events.md#retrievetabid-limit)
  * [`list(limit, offset, tags)`](docs/events.md#listlimit-offset-tags)
  * [`markAllAsRead(tags)`](docs/events.md#mark-all-as-read)
* features
  * [`list(type)`](docs/features.md#listtype)
  * [`create(feature)`](docs/features.md#createfeature)
  * [`update(featureName, feature)`](docs/features.md#updatefeaturename-feature)
  * [`delete(featureName)`](docs/features.md#deletefeaturename)
  * [`listByVenue(venueId)`](docs/features.md#listbyvenuevenueid)
  * [`checkFeatureByVenue(venueId, featureName)`](docs/features.md#checkfeaturebyvenuevenueid-featureName)
  * [`updateFeatureByVenue(venueId, featureName, feature)`](docs/features.md#updatefeaturebyvenuevenueid-featurename-feature)
* notifications
  * [`list(userId, start, limit, type, unread, noCache)`](docs/notifications.md#listuserid-start-limit-type-unread-nocache)
  * [`count(userId, type, unread, noCache)`](docs/notifications.md#countuserid-start-limit-type-unread-nocache)
  * [`create(notification)`](docs/notifications.md#createnotification)
  * [`flagAsRead(userId, body, id)`](docs/notifications.md#flagasreaduserid-body-id)
  * [`delete()`](docs/notifications.md#delete)
* bookings
  * [`month(date, venueId)`](docs/bookings.md#monthdate-venueid)
* venues
  * [`retrieve(venueId, { fields, params })`](docs/venues.md#retrievevenueid--fields-params-)
  * [`getPaymentSettings(venueId)`](docs/venues.md#getpaymentsettings-venueId)
  * [`savePaymentSettings(venueId, params)`](docs/venues.md#savepaymentsettings-venueId-params)
* payments
  * [`users.get({userId})`](docs/payments.md#users.getuserid)
  * [`users.subscriptions({userId})`](docs/payments.md#users.subscriptionsuserid)
  * [`users.invoices({userId})`](docs/payments.md#users.invoicesuserid)
  * [`users.payments({userId})`](docs/payments.md#users.paymentsuserid)
  * [`users.upsert({userId, user})`](docs/payments.md#users.upsertuserId-user)
  * [`users.createSource({userId, token, email, setDefault})`](docs/payments.md#users.createSourceuserid-token-email-setdefault)
  * [`users.createCharge({userId, charge})`](docs/payments.md#users.createchargeuserid-charge)
  * [`users.listSources({userId, limit, lastId})`](docs/payments.md#users.listsourcesuserid-limit-lastid)
  * [`users.deleteSource({userId, sourceId})`](docs/payments.md#users.deletesourceuserid-sourceid)
  * [`users.setDefaultSource({userId, sourceId})`](docs/payments.md#users.setdefaultsourceuserid-sourceid)
* reports
  * [`reports.bookings.enquire({venueId, type, start, end, task})`](docs/reports.md#bookingsenquirevenueid-type-start-end-task)
  * [`reports.bookings.retrieve({venueId, type, jobId})`](docs/reports.md#bookingsretrievevenueid-type-jobid)
  * [`bookingReferrers.enquire({start, end, autoResolve, onProgress})`](docs/reports.md#bookingreferrersenquirestart-end-autoretrieve-onprogress)
  * [`bookingReferrers.retrieve({jobId})`](docs/reports.md#bookingreferrersretrievejobid)
