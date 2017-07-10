# Notifications

## `list({userId, start, limit, type, unread, noCache})`
List all avaiable notifications for a given `userId`, `type` or if `unread`

#### Params

| Name    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| userId  | int    | Yes      | ID of the venue           |
| start   | string | Yes      | Start row                 |
| limit   | string | Yes      | Limit results per request |
| type    | string | No       | Filter results by type    |
| unread  | bool   | No       | Filter results by unread  |
| noCache | bool   | No       | Reset and rebuild cache   |

```js
const data = await deskbookers.notifications.list(
  {userId: 999999999, start: 0, limit: 10, type: 'blue-corgi', unread: false}
)
```

#### Example response
```json
[
  {
    "id": 2457,
    "userId": 999999999,
    "context": "v12345",
    "meta": {
      "userName": "User Name",
      "companyName": "Company"
    },
    "createdDate": "2017-06-27T13:03:42.323Z",
    "readedDate": null,
    "type": "corgi"
  },
  {
    "id": 2458,
    "userId": 999999999,
    "context": "v12345",
    "meta": {
      "userName": "User Name2",
      "companyName": "Company2"
    },
    "createdDate": "2017-06-27T13:03:42.344Z",
    "readedDate": null,
    "type": "blue-corgi"
  }
]
```

## `count({userId, type, unread, noCache})`
Count all avaiable notifications for a given `userId`, `type` or if `unread`

#### Params

| Name    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| userId  | int    | Yes      | ID of the venue           |
| type    | string | No       | Filter results by type    |
| unread  | bool   | No       | Filter results by unread  |
| noCache | bool   | No       | Reset and rebuild cache   |

```js
const data = await deskbookers.notifications.count(
  {userId: 999999999, type: 'blue-corgi', unread: false}
)
```

#### Example response
```json
[
  {
    "count": "2"
  }
]
```

## `create(notification)`
Create a new notification for a given `Object` in the body as a json.

#### Body

| Name        | Type      | Required | Description                   |
| ----------- | --------- | -------- | ----------------------------- |
| userId      | int       | Yes      | ID of the user                |
| type        | string    | Yes      | Notification type             |
| context     | string    | No       | Venue or Provider id          |
| meta        | Object    | No       | Data to show (type based)     |
| createdDate | Timestamp | Yes      | Date notification was created |
| readedDate  | Timestamp | No       | Date user read notification   |

```js
const data = await deskbookers.notifications.create(
  {
    userId: 2, 
    type: 'fluffycorgi',
    context: 'c12345',
    meta:'{"clientName": "Chompers", "companyName": "Lambda3"}',
    createdDate: 1498653156259
  }
)
```

#### Example response
```json
{
  "status": "ok"
}
```

## `flagAsRead(userId, type)`
Mark notification read for a given `type`(optional) in the body as a json and for a given `userId`.


```js
const data = await deskbookers.notifications.flagAsRead(2, 'fluffycorgi')
```

#### Example response
```json
{
  "status": "ok"
}
```

## `delete()`
Delete notifications created more than 15 days

#### Example response
```json
{
  "status": "ok"
}
```
