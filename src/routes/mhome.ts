import { hexToRgb } from './../utils/mhome';
import { Control } from 'magic-home';
import { Router } from 'express';

let devices = [];

const getDevices = (id: string, address: string) => {
  return devices.filter(
    (device) =>
      (id === undefined || device.id === id) &&
      (address === undefined || device.address === address),
  );
};

/**
 * @method - POST
 * @param - /color
 * @description - Sets color
 */
Router.post('/color', (req, res) => {
  try {
    const color = req.body.color;
    const brightness = req.body.brightness ? req.body.brightness : 100;
    const id = req.body.id;
    const address = req.body.address;

    if (typeof color === 'undefined') {
      res.status('500').send(`'color' must be defined`);
      return;
    }

    let r = 255,
      g = 255,
      b = 255;

    if (typeof color === 'number') {
      const c = req.body.color;
      r = Math.floor(c / (256 * 256));
      g = Math.floor(c / 256) % 256;
      b = c % 256;
    } else if (typeof color === 'string') {
      const rgb = hexToRgb(color);

      if (rgb == null) throw "Couldn't parse color string";

      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
    } else {
      res
        .status('500')
        .send(`'color' must be of type string (hex) or number (decimal)`);
      return;
    }

    // Filter devices and loop over them to set color
    const localDevices = getDevices(id, address);

    const promises = [];

    localDevices.forEach((device) => {
      const control = new Control(device.address, {
        wait_for_reply: false,
      });
      promises.push(control.setColorWithBrightness(r, g, b, brightness));
    });

    Promise.all(promises)
      .then(() => res.sendStatus('200'))
      .catch((err) => res.status(500).send(err.message));
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @method - POST
 * @param - /power
 * @description - Controls power
 */
Router.post('/power', (req, res) => {
  try {
    const id = req.body.id;
    const address = req.body.address;
    const power = req.body.power;

    if (typeof power !== 'boolean') {
      res.status('500').send(`'power' must be a boolean`);
      return;
    }

    // Filter devices and loop over them to set power
    const localDevices = getDevices(id, address);

    const promises = [];

    localDevices.forEach((device) => {
      const control = new Control(device.address, {
        wait_for_reply: false,
      });
      promises.push(control.setPower(power));
    });

    Promise.all(promises)
      .then(() => res.sendStatus('200'))
      .catch((err) => res.status(500).send(err.message));
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @method - GET
 * @param - /devices
 * @description - Gets all magic home devices on a network
 */
Router.get('/devices', (req, res) => {
  res.json(devices);
});

/**
 * @method - GET
 * @param - /device/:id
 * @description - Gets single device
 */

Router.get('/device/:id', (req, res) => {
  const id = req.params.id;

  if (typeof id === 'undefined') {
    res.status(500).send(`'id' must be defined`);
    return;
  }

  const device = devices.find((element) => element.id === id);

  if (device === undefined) {
    res.status(500).send(`No device with id ${id} was found`);
    return;
  }

  new Control(device.address)
    .queryState()
    .then((state) => res.json(state))
    .catch((err) => res.status(500).send(err));
});

export default Router;
