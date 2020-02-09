import {Component, Input, OnInit} from '@angular/core';
import {Movimentacao} from "../../../../../model/movimentacao";

@Component({
  selector: 'pec-informacoes-tronco',
  templateUrl: './informacoes-tronco.component.html',
  styleUrls: ['./informacoes-tronco.component.scss']
})
export class InformacoesTroncoComponent implements OnInit {

  @Input() movimentacao: Movimentacao = new Movimentacao();

  constructor() {
  }

  ngOnInit() {
  }

}
