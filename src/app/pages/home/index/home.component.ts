import {Component, OnInit} from '@angular/core';
import {MenuServiceService} from "../services/menu-service.service";
import {PoMenuItem} from "@portinari/portinari-ui";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hideMenu: boolean = false;

  constructor(
    menuService: MenuServiceService
  ) {
    menuService.hideMenu.subscribe(result => {
      this.hideMenu = result;
    })
  }

  ngOnInit() {
  }

}
