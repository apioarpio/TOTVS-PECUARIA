import {Component, OnInit} from '@angular/core';
import {PoMenuItem} from "@portinari/portinari-ui";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss']
})
export class HomeInfoComponent implements OnInit {

  readonly menus: Array<PoMenuItem> = [
    {label: 'Home', shortLabel: 'Home', link: '/home/info', icon: 'po-icon-home'},
    {label: 'Operações Curral', shortLabel: 'Curral', link: '../operacoes-curral', icon: 'po-icon-home'},
    // {label: 'Entidade', shortLabel: 'Entidade', link: './entidade', icon: 'po-icon-home'},
    // {label: 'Animal', shortLabel: 'Animal', link: './animal', icon: 'po-icon-home'},
    // {label: 'Raças Animais', shortLabel: 'Raças', link: './racasAnimais', icon: 'po-icon-home'}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  goOperacoesCurral() {
    this.router.navigate(['../operacoesCurral'], {relativeTo: this.route})
  }

}
