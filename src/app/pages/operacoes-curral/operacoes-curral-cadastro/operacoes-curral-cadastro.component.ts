import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {PoTableColumn} from "@portinari/portinari-ui";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PecModalFormAnimalComponent} from "../components/pec-modal-form-animal/pec-modal-form-animal.component";
import {Movimentacao} from "../../../model/movimentacao";
import {MovimentacaoService} from "../../../services/models/movimentacao.service";
import {TiposMovimentoLookupService} from "../../../services/lookup/tipos-movimento-lookup.service";
import {TiposMovimento} from "../../../model/tipos-movimento";
import {TiposMovimentoEntradaLookupService} from "../../../services/lookup/tipos-movimento-entrada-lookup.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manejo-entrada',
  templateUrl: './operacoes-curral-cadastro.component.html',
  styleUrls: ['./operacoes-curral-cadastro.component.scss']
})
export class OperacoesCurralCadastroComponent implements OnInit {

  @ViewChild(PecModalFormAnimalComponent, {static: true}) pecModal;
  readonly lookupColumns = [
    {property: 'idTm', label: 'Codigo'},
    {property: 'descricao', label: 'Descrição'}
  ];
  public manejoEntradaForm = new FormGroup({
    codTM: new FormControl('', [Validators.required]),
    descTM: new FormControl(''),
    observacao: new FormControl(''),
    quantidadeAnimais: new FormControl('', [Validators.required]),
    codFornecedor: new FormControl(),
    fornecedor: new FormControl(),
    nGta: new FormControl(),
    serieGta: new FormControl(),
    emissaoGta: new FormControl(),
    validadeGta: new FormControl(),
    chegadaGta: new FormControl(),
    saidaGta: new FormControl()
  });
  public columns: PoTableColumn[] = [
    {label: 'SISBOV', property: 'sisBov', type: 'number'},
    {label: 'Peso', property: 'peso'},
    {label: 'Sexo', property: 'sexo'},
    {label: 'Raça', property: 'raca'},
    {label: 'Aparte', property: 'aparte'},
    {label: 'Idade', property: 'idade'},
    {label: 'Faixa Etária', property: 'faixaEtaria'},
    {
      property: 'favorite', label: 'Actions', type: 'icon', icons: [
        {
          action: this.editAnimal.bind(this),
          icon: 'po-icon-edit',
          tooltip: 'Editar Animal',
          value: 'edit'
        }
      ]
    }
  ];
  TMTipo: number;
  animais: Array<any> = [];
  tipoMovimentacao;

  constructor(
    private location: Location,
    private movimentacaoService: MovimentacaoService,
    private route: ActivatedRoute,
    public tiposMovimentoLookupService: TiposMovimentoEntradaLookupService
  ) {
  }

  ngOnInit() {
    this.tipoMovimentacao = this.route.snapshot.paramMap.get('tipoMovimentacao');
    console.log(this.tipoMovimentacao);
    console.log(this.manejoEntradaForm.controls['cdTM']);
  }

  backRoute() {
    this.location.back();
  }

  /**
   * @description   adiciona um animal no array de animais
   */
  addAnimal(event) {
    this.animais.push(event);
    console.log(event)
  }

  saveMovimentacao(): void {
    console.log(this.manejoEntradaForm);
    let movimentacao: Movimentacao = new Movimentacao();
    let tm: TiposMovimento = new TiposMovimento();
    movimentacao.tipoMovimento = tm;
    movimentacao.tipoMovimento.idTm = this.manejoEntradaForm.controls['codTM'].value;
    movimentacao.descricaoTm = this.manejoEntradaForm.controls['descTM'].value;
    movimentacao.tipo = this.tipoMovimentacao;
    movimentacao.observacao = this.manejoEntradaForm.controls['observacao'].value;
    movimentacao.quantidadeAnimal = this.manejoEntradaForm.controls['quantidadeAnimais'].value;
    movimentacao.idFornecedor = this.manejoEntradaForm.controls['codFornecedor'].value;
    movimentacao.nomeFantasiaFornecedor = this.manejoEntradaForm.controls['fornecedor'].value;
    movimentacao.numeroGta = this.manejoEntradaForm.controls['nGta'].value;
    movimentacao.serieGta = this.manejoEntradaForm.controls['serieGta'].value;
    movimentacao.dataEmissaoGta = this.manejoEntradaForm.controls['emissaoGta'].value;
    movimentacao.dataValidadeGta = this.manejoEntradaForm.controls['validadeGta'].value;
    movimentacao.dataChegadaGta = this.manejoEntradaForm.controls['chegadaGta'].value;
    movimentacao.dataSaidaGta = this.manejoEntradaForm.controls['saidaGta'].value;

    this.movimentacaoService.saveMovimentacao(movimentacao).subscribe(response => {
      if (response) {
        this.location.back();
      }
    })

  }

  editAnimal(event) {
    this.pecModal.openEditModal(event);
  }

  /**
   * @description função chamada no momento em que um tipo de operacoes-curral é selecionado
   * @param event
   */
  lookupSelected(event) {
    this.manejoEntradaForm.controls['descTM'].setValue(event.DESCRICAO);
    this.TMTipo = event.TIPO;
  }

}
