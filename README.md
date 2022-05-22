# RoomieAPI

The RoomieAPI is a RESTful API for managing the following devices:

- Marantz AV Receiver
- Magic Home Lights

## Marantz AV Receiver

| Endpoint                 | Description             | Method |
| ------------------------ | ----------------------- | ------ |
| /marantz/power_on        | Power on                | POST   |
| /marantz/power_off       | Power off               | POST   |
| /marantz/increase_volume | Increases volume        | POST   |
| /marantz/decrease_volume | Decreases volume        | POST   |
| /marantz/toggle_mute     | Mutes/unmutes the sound | POST   |

## Magic Home Lights

| Endpoint           | Description                           | Method |
| ------------------ | ------------------------------------- | ------ |
| /mhome/devices     | Returns list of devices               | GET    |
| /mhome/devices/:id | Returns a specific devices            | GET    |
| /mhome/power       | Controls the power status of a device | POST   |
| /mhome/color       | Sets the color of a device            | POST   |

### Get devices

Gets a list of magic-home devices on the network

**URL** : `/mhome/devices/`

**Method** : `GET`

#### Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "address": "192.168.69.198",
    "id": "F4CFA2120867",
    "model": "AK001-ZJ2101"
  }
]
```

### Get device state

Gets a the state of a magic-home device, by it's id

**URL** : `/mhome/device/:id`

**Method** : `GET`

#### Success Response

**Code** : `200 OK`

**Content example**

```json5
{
  "type": 51,
  "on": true,
  "mode": "color",
  "speed": 66.66666666666667,
  "color": {
    "red": 255,
    "green": 255,
    "blue": 0
  },
  "warm_white": 0,
  "cold_white": 0
}
```
### Change color

Change the color of a magic-home device, by it's address or id.

**URL** : `/mhome/color/`

**Method** : `POST`

**Data constraints**

If no id or address is provided, all lights on the network will receive this change.

```json5
{
    "id": "id of magic-home device, string, optional",
    "address": "address of magic-home device, string, optional",
    "color": "color to change to, string (hex) or number (decimal), required",
    "brightness": "brightness to adjust the color with, number, optional"
}
```

**Data example**

```json5
{
    "id": "F4CFA2120867",
    "address": "192.168.69.198",
    "color": "#FF0000", // or "FF0000" or 16711680
    "brightness": "100"
}
```

#### Success Response

**Condition** : Color commands were sent

**Code** : `200 OK`

### Turn on/off

Change the power state of a magic-home device, by it's address or id.

**URL** : `/mhome/power/`

**Method** : `POST`

**Data constraints**

If no id or address is provided, all lights on the network will receive this change.

```json5
{
    "id": "id of magic-home device, string, optional",
    "address": "address of magic-home device, string, optional",
    "power": "power state to set, required"
}
```

**Data example**

```json5
{
    "id": "F4CFA2120867",
    "address": "192.168.69.198",
    "power": false
}
```

#### Success Response

**Condition** : Power commands were sent

**Code** : `200 OK`
