import {Component, OnInit} from '@angular/core';
import {PoMenuItem} from "@portinari/portinari-ui";

@Component({
  selector: 'pecuaria-side-menu',
  templateUrl: './side-menu-pecuaria.component.html',
  styleUrls: ['./side-menu-pecuaria.component.scss']
})
export class SideMenuPecuariaComponent implements OnInit {

  readonly menus: Array<PoMenuItem> = [
    {label: 'Home', shortLabel: 'Home', link: '/home', icon: 'po-icon-home'},
    {label: 'Movimentação', shortLabel: 'Moviment.', link: './movimentacao', icon: 'po-icon-home'},
    {label: 'Entidade', shortLabel: 'Entidade', link: './entidade', icon: 'po-icon-home'},
    {label: 'Animal', shortLabel: 'Animal', link: './animal', icon: 'po-icon-home'},
    {label: 'Raças Animais', shortLabel: 'Raças', link: './racasAnimais', icon: 'po-icon-home'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
