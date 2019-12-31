import {EventEmitter, Injectable, Output} from '@angular/core';
import {ElectronService} from "ngx-electron";
import {buffer} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GenericBluetoothService {

  @Output() devicesList: EventEmitter<any> = new EventEmitter();
  isDeviceConected = false;
  deviceConected;
  @Output() dataBluetoothDevice: EventEmitter<any> = new EventEmitter();

  btSerial = new (this.electronService.remote.require('bluetooth-serial-port')).BluetoothSerialPort();

  constructor(
    private electronService: ElectronService
  ) {
    this.getDevices();

    this.btSerial.on('data', buffer => {
      console.log('buffer', buffer);
      this.dataBluetoothDevice.emit(buffer.toString('utf-8'));
    })

  }


  getDevices() {
    this.btSerial.listPairedDevices(devices => {
      this.devicesList.emit(devices)
    });
  }

  syndDevice(device): Promise<any> {
    const that = this;
    console.log(device)
    return new Promise((resolve, reject) => {
      that.btSerial.findSerialPortChannel(device.address, (channel) => {

        that.btSerial.connect(device.address, channel, function () {
          console.log('connected');
          that.isDeviceConected = true;
          that.deviceConected = device;
        }, function () {
          console.log('cannot connect');
          reject('error')
        });

      }, function () {
        console.log('found nothing');
        reject('erro')
      })
    })
  }

}
