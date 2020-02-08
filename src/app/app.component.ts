import {Component} from '@angular/core';

import {ElectronService} from "ngx-electron";
import {GenericBluetoothService} from "./services/bluetooth/generic-bluetooth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  electron = this.electronService.remote.require('electron');

  constructor(
    private electronService: ElectronService,
    private bluetoothService: GenericBluetoothService
  ) {

  }

  onClick() {
    this.bluetoothService.getDevices()
  }

}
