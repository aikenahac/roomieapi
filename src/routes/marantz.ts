import express, { Router } from 'express';
import { Marantz } from '../modules';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const mrntz: Marantz = new Marantz();

/**
 * @method - PUT
 * @param - /power_off
 * @description - Turns off the Marantz
 */

Router.put('/power_off', async (req, res) => {
  try {
    await mrntz.powerOff();

    res.send({
      status: 200,
      message: 'Turned off',
    });
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error.',
    });
  }
});

/**
 * @method - PUT
 * @param - /power_on
 * @description - Turns on the Marantz
 */

Router.put('/power_on', async (req, res) => {
  try {
    await mrntz.powerOn();

    res.send({
      status: 200,
      message: 'Turned on',
    });
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error.',
    });
  }
});

/**
 * @method - PUT
 * @param - /increase_volume
 * @description - Increases the volume on the Marantz
 */

Router.put('/increase_volume', async (req, res) => {
  try {
    await mrntz.increaseVolume();

    res.send({
      status: 200,
      message: 'Increased volume',
    });
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error.',
    });
  }
});

/**
 * @method - PUT
 * @param - /decrease_volume
 * @description - Decreases the volume on the Marantz
 */

Router.put('/decrease_volume', async (req, res) => {
  try {
    await mrntz.decreaseVolume();

    res.send({
      status: 200,
      message: 'Decreased volume',
    });
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error.',
    });
  }
});

/**
 * @method - PUT
 * @param - /toggle_mute
 * @description - Mutes/unmutes the sound on the Marantz
 */

Router.put('/toggle_mute', async (req, res) => {
  try {
    await mrntz.toggleMute();

    res.send({
      status: 200,
      message: 'Decreased volume',
    });
  } catch (err) {
    res.send({
      status: 500,
      message: 'There was an error.',
    });
  }
});

export default Router;
