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
  readonly menus: Array<PoMenuItem> = [
    {label: 'Home', shortLabel: 'Home', link: '/home', icon: 'po-icon-home'},
    {label: 'Movimentação', shortLabel: 'Moviment.', link: './operacoesCurral', icon: 'po-icon-home'},
    {label: 'Entidade', shortLabel: 'Entidade', link: './entidade', icon: 'po-icon-home'},
    {label: 'Animal', shortLabel: 'Animal', link: './animal', icon: 'po-icon-home'},
    {label: 'Raças Animais', shortLabel: 'Raças', link: './racasAnimais', icon: 'po-icon-home'}
  ];

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
