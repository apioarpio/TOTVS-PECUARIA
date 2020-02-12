import {Component} from '@angular/core';

import {ElectronService} from "ngx-electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  electron = this.electronService.remote.require('electron');

  constructor(
    private electronService: ElectronService,
  ) {

  }

}
