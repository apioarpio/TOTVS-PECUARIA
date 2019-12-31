import {Component, OnInit} from '@angular/core';
import {GenericBluetoothService} from "../../../services/bluetooth/generic-bluetooth.service";

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss']
})
export class BluetoothComponent implements OnInit {

  devices = [];
  resultBluetooth = '';

  constructor(
    private bluetoothService: GenericBluetoothService
  ) {

    this.bluetoothService.devicesList.subscribe(result => {
      console.log(result);
      this.devices = result
    })

    this.bluetoothService.dataBluetoothDevice.subscribe( result => {
      console.log(result)
      this.resultBluetooth = result;
    })

  }

  ngOnInit() {

  }

  syncDevice(device) {
    this.bluetoothService.syndDevice(device);
  }

}
