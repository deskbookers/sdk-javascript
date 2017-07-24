# Features

## `list(type)`
List all avaiable features for a given `type`(optional) or `country`(optional).

```js
const data = await deskbookers.feature.list()
```
#### Example response
```json
[
  {
    "description": "Review widgets",
    "id": 3,
    "name": "reviewWidgets",
    "parentId": null,
    "readonly": false,
    "type": "venue"
  },
  {
    "description": "Book button widgets",
    "id": 4,
    "name": "bookButtonWidgets",
    "parentId": null,
    "readonly": false,
    "type": "venue"
  },
  {
    "description": "Regular customer discounts",
    "features": [
      {
        "description": "Regular customer discounts son 1",
        "features": [
          {
            "description": "Regular customer discounts grandson 1",
            "id": 7,
            "name": "rcdGrandson1",
            "parentId": 5,
            "readonly": true,
            "type": "venue"
          }
        ],
        "id": 5,
        "name": "rcdSon1",
        "parentId": 1,
        "readonly": true,
        "type": "venue"
      },
      {
        "description": "Regular customer discounts son 2",
        "id": 6,
        "name": "rcdSon2",
        "parentId": 1,
        "readonly": true,
        "type": "venue"
      }
    ],
    "id": 1,
    "name": "regularCustomerDiscounts",
    "parentId": null,
    "readonly": true,
    "type": "venue"
  },
  {
    "description": "Booking tool",
    "features": [
      {
        "description": "Booking Tool Son 1",
        "id": 8,
        "name": "btSon1",
        "parentId": 2,
        "readonly": true,
        "type": "booking"
      }
    ],
    "id": 2,
    "name": "bookingTool",
    "parentId": null,
    "readonly": true,
    "type": "booking"
  }
]
```

```js
const data = await deskbookers.feature.list({type: 'booking'})
```
#### Example response
```json
[
  {
    "description": "Booking tool",
    "features": [
      {
        "description": "Booking Tool Son 1",
        "id": 8,
        "name": "btSon1",
        "parentId": 2,
        "readonly": true,
        "type": "booking"
      }
    ],
    "id": 2,
    "name": "bookingTool",
    "parentId": null,
    "readonly": true,
    "type": "booking"
  }
]
```
```js
const data = await deskbookers.feature.list('booking')
```
#### Example response
```json
[
  {
    "description": "Booking tool",
    "features": [
      {
        "description": "Booking Tool Son 1",
        "id": 8,
        "name": "btSon1",
        "parentId": 2,
        "readonly": true,
        "type": "booking"
      }
    ],
    "id": 2,
    "name": "bookingTool",
    "parentId": null,
    "readonly": true,
    "type": "booking"
  }
]
```

## `create(feature)`
Create a new feature for a given `Object`.

#### Body (feature)
Name | Type | Description | Required
--- | --- | --- | ---
name | String | Alphanumeric feature name | Yes
parentId | Integer | Id of the parent feature | No
description | String | Short description of the feature | No
type | String | Alphanumeric type name | Yes

```js
const data = await deskbookers.feature.create(
  {
    name: 'testName',  
    description: 'teste description', 
    type: 'venue'
  }
)
```
#### Example response
```json
{
  "status": "ok"
}
```

## `update(featureName, feature)`
Update a feature for a given `featureName` with the `Object`.

#### Body (feature)
Name | Type | Description | Required
--- | --- | --- | ---
name | String | Alphanumeric feature name | Yes
parentId | Integer | Id of the parent feature | No
description | String | Short description of the feature | No
type | String | Alphanumeric type name | Yes

```js
const data = await deskbookers.feature.update(
  'testName',
  {
    name: 'testName',
    description: 'teste description 2',
    type: 'venue2',
    parentId: null
  }
)
```
#### Example response
```json
{
  "status": "ok"
}
```

## `delete(featureName)`
Delete a feature for a given `featureName`.

```js
const data = await deskbookers.feature.delete('testName')
```
#### Example response
```json
{
  "status": "ok"
}
```

## `listByVenue(venueId)`
List all active features for a given `venueId`.

```js
const data = await deskbookers.feature.listByVenue(1)
```
#### Example response
```json
[
  {
    "description": "Regular custumer discounts",
    "end": null,
    "features": [
      {
        "description": "Regular custumer discounts son 1",
        "end": null,
        "features": [
          {
            "description": "Regular custumer discounts grandson 1",
            "end": "2017-07-20T10:37:17.313Z",
            "id": 7,
            "name": "rcdGrandson1",
            "parentId": 5,
            "start": "2017-06-20T10:37:17.313Z",
            "type": "venue"
          }
        ],
        "id": 5,
        "name": "rcdSon1",
        "parentId": 1,
        "start": "2017-06-20T10:37:17.217Z",
        "type": "venue"
      },
      {
        "description": "Regular custumer discounts son 2",
        "end": null,
        "id": 6,
        "name": "rcdSon2",
        "parentId": 1,
        "start": "2017-06-20T10:37:17.260Z",
        "type": "venue"
      }
    ],
    "id": 1,
    "name": "regularCustumerDiscounts",
    "parentId": null,
    "start": "2017-06-20T10:37:17.172Z",
    "type": "venue"
  }
]
```

## `checkFeatureByVenue(venueId, featureName)`
List all active features for a given `venueId` and `featureName`.

```js
  const data = await deskbookers.feature.checkFeatureByVenue(
    1,
    'regularCustumerDiscounts'
  )
```
#### Example response
```json
false
```

## `updateFeatureByVenue(venueId, featureName, feature)`
Update features for a given `venueId`, `featureName` and `feature`.

#### Body (feature)
Name | Type | Description | Required
--- | --- | --- | ---
enabled | boolean | Set enabled status | Yes
start | Timestamp | Feature active start date | No
end | Timestamp | Feature active end date | No

```js
  let start = new Date().setDate(new Date().getDate()-20) 
  let end = new Date().setDate(new Date().getDate()+5) 
  const data = await deskbookers.feature.updateFeatureByVenue(
    2,
    'bookingTool',
    {
      enabled: true,
      start,
      end
    }
  )
```
#### Example response
```json
{
  "status": "ok"
}
```