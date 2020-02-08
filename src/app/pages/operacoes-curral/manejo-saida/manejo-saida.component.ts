import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuServiceService} from "../../home/services/menu-service.service";
import {MovimentacaoService} from "../../../services/models/movimentacao.service";
import {PoTableAction, PoTableColumn} from "@portinari/portinari-ui";

@Component({
  selector: 'app-manejo-saida',
  templateUrl: './manejo-saida.component.html',
  styleUrls: ['./manejo-saida.component.scss']
})
export class ManejoSaidaComponent implements OnInit {
  actions: Array<PoTableAction> = [
    {action: this.goTronco.bind(this), icon: 'po-icon-change', label: 'Manejo Animal'},
    {action: this.goTronco.bind(this), icon: 'po-icon-edit', label: 'Editar'},
    {action: this.goTronco.bind(this), icon: 'po-icon-delete', label: 'Deletar'},
  ];

  public columns: PoTableColumn[] = [
    {label: 'Código', property: 'id', type: 'number'},
    {label: 'Cod TM', property: 'idTm', type: 'number'},
    {label: 'Quantidade Animais', property: 'qtdAnimais'},
    {label: 'Data Movimento', property: 'data'}
  ];

  public items: Array<any> = [];

  constructor(
    private location: Location,
    private router: Router,
    private menuService: MenuServiceService,
    private route: ActivatedRoute,
    private movimentacaoService: MovimentacaoService
  ) {
  }

  ngOnInit() {
    this.getMovimentos()
  }

  goOperacaoSaidaCadastro() {
    this.router.navigate(['../operacaoCadastro/3'], {relativeTo: this.route})
  }

  backRoute() {
    this.menuService.hideMenu.emit(false);
    this.location.back();
  }


  getMovimentos() {
    this.items = [];
    this.movimentacaoService.getMovimentacoes(3, null).subscribe(result => {
      for (const movimentacao of result["items"]) {
        this.items.push({
          id: movimentacao.idMovimentacao,
          idTm: movimentacao.tipoMovimento.idTm,
          qtdAnimais: movimentacao.quantidadeAnimal,
          data: movimentacao.dataCadastro
        })
      }
    })
  }

  /**
   *
   * @param param
   */
  goTronco(param) {
    console.log(param);
    this.router.navigate(['../tronco', param.id], {relativeTo: this.route});
  }

}
