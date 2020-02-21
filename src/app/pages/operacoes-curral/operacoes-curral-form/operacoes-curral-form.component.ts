import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Movimentacao} from "../../../model/movimentacao";
import {PoTableColumn} from "@portinari/portinari-ui";
import {TiposMovimento} from "../../../model/tipos-movimento";
import {TiposMovimentoEntradaLookupService} from "../../../services/lookup/tipos-movimento-entrada-lookup.service";
import {EntidadesLookupService} from "../../../services/lookup/entidades-lookup.service";

@Component({
  selector: 'pec-operacoes-curral-form',
  templateUrl: './operacoes-curral-form.component.html',
  styleUrls: ['./operacoes-curral-form.component.scss']
})
export class OperacoesCurralFormComponent implements OnInit {

  @Input() movimentacao: Movimentacao = new Movimentacao();
  @Input('formGroup') operacoesCurralFormGroup: FormGroup;

  readonly tiposMovimentolookupColumns = [
    {property: 'idTm', label: 'Codigo'},
    {property: 'descricao', label: 'Descrição'}
  ];
  readonly entidadeLookupColumns = [
    {property: 'idEntidade', label: 'Codigo'},
    {property: 'nome', label: 'nome'},
    {property: 'uf', label: 'Estado'},
    {property: 'cnpj', label: 'CNPJ'}
  ];
  public columns: PoTableColumn[] = [
    {label: 'SISBOV', property: 'sisBov', type: 'number'},
    {label: 'Peso', property: 'peso'},
    {label: 'Sexo', property: 'sexo'},
    {label: 'Raça', property: 'raca'},
    {label: 'Aparte', property: 'aparte'},
    {label: 'Idade', property: 'idade'},
    {label: 'Faixa Etária', property: 'faixaEtaria'},
    {
      property: 'favorite', label: 'Actions', type: 'icon2.png', icons: [
        {
          action: this.editAnimal.bind(this),
          icon: 'po-icon-edit',
          tooltip: 'Editar Animal',
          value: 'edit'
        }
      ]
    }
  ];
  public animais: Array<any> = [];

  constructor(
    private tiposMovimentoLookupService: TiposMovimentoEntradaLookupService,
    private entidadeLookupService: EntidadesLookupService
  ) {
  }

  ngOnInit() {
  }

  /**
   * @description função chamada no momento em que um tipo de operacoes-curral é selecionado
   * @param event
   */
  onSelectLookupTipoMovimento(event) {
    console.log(`TM`, event);
    this.operacoesCurralFormGroup.controls['descricaoTm'].setValue(event.descricao);
    this.movimentacao.tipoMovimento.tipo = event.tipo;
  }

  onSelectLookupEntidade(valor) {
    this.movimentacao.nomeFantasiaFornecedor = valor.nome;
    console.log(valor)
  }

  onErrorLookupTipoMovimento(err) {
    console.log(err)
  }

  editAnimal(event) {
    // this.pecModal.openEditModal(event);
  }

}
