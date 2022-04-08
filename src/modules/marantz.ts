import axios from 'axios';

const { MARANTZ_IP } = require('../../config.json');

const url = MARANTZ_IP;

export default class Marantz {
  baseEndpoint1: string = '/MainZone/index.put.asp?cmd0=';
  baseEndpoint2: string = '&cmd1=aspMainZone_WebUpdateStatus%2F';

  async powerOn() {
    await axios.get(
      url + this.baseEndpoint1 + 'PutZone_OnOff%2FON' + this.baseEndpoint2,
    );
  }

  async powerOff() {
    await axios.get(
      url + this.baseEndpoint1 + 'PutZone_OnOff%2FOFF' + this.baseEndpoint2,
    );
  }

  async increaseVolume() {
    await axios.get(
      url + this.baseEndpoint1 + 'PutMasterVolumeBtn%2F>' + this.baseEndpoint2,
    );
  }

  async decreaseVolume() {
    await axios.get(
      url + this.baseEndpoint1 + 'PutMasterVolumeBtn%2F<' + this.baseEndpoint2,
    );
  }

  async toggleMute() {
    await axios.get(
      url + this.baseEndpoint1 + 'PutVolumeMute%2FTOGGLE' + this.baseEndpoint2,
    );
  }
}
