import {Component} from '@angular/core';

import {PoMenuItem} from '@portinari/portinari-ui';
import {ElectronService} from "ngx-electron";
import {Router} from "@angular/router";
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
    private bluetoothService: GenericBluetoothService,
    private router: Router
  ) {

  }

  onClick() {
    this.bluetoothService.getDevices()
  }

  pinga() {
    const reqGoogle = this.electron.net.request('http://www.google.com');
    reqGoogle.on('respose', (response) => {
      console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })
  }

  public playPingPong() {
    if (this.electronService.isElectronApp) {
      let pong: string = this.electronService.ipcRenderer.sendSync('ping');
      console.log(pong);
    }
  }

}
