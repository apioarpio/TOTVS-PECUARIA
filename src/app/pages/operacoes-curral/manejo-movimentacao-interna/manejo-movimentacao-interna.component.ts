import {Component, OnInit} from '@angular/core';
import {PoTableAction, PoTableColumn} from "@portinari/portinari-ui";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuServiceService} from "../../home/services/menu-service.service";
import {MovimentacaoService} from "../../../services/models/movimentacao.service";

@Component({
  selector: 'app-manejo-movimentacao-interna',
  templateUrl: './manejo-movimentacao-interna.component.html',
  styleUrls: ['./manejo-movimentacao-interna.component.scss']
})
export class ManejoMovimentacaoInternaComponent implements OnInit {

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

  goMovimentacaoInternaCadastro() {
    this.router.navigate(['../operacaoCadastro/2'], {relativeTo: this.route})
  }

  backRoute() {
    this.menuService.hideMenu.emit(false);
    this.location.back();
  }

  getMovimentos() {
    this.items = [];
    this.movimentacaoService.getMovimentacoes(2, null).subscribe(result => {
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
