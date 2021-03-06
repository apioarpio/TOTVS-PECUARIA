import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {PoTableColumn} from "@portinari/portinari-ui";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PecModalFormAnimalComponent} from "../components/pec-modal-form-animal/pec-modal-form-animal.component";
import {Movimentacao} from "../../../model/movimentacao";
import {MovimentacaoService} from "../../../services/models/movimentacao.service";
import {TiposMovimento} from "../../../model/tipos-movimento";
import {ActivatedRoute} from "@angular/router";
import {OperacoesCurralFormComponent} from "../operacoes-curral-form/operacoes-curral-form.component";

@Component({
  selector: 'app-manejo-entrada',
  templateUrl: './operacoes-curral-cadastro.component.html',
  styleUrls: ['./operacoes-curral-cadastro.component.scss']
})
export class OperacoesCurralCadastroComponent implements OnInit {

  @ViewChild(PecModalFormAnimalComponent, {static: true}) pecModal;
  @ViewChild(OperacoesCurralFormComponent, {static: true}) operacoesCurralForm;

  private formGroup: FormGroup = new FormGroup({
    idTm: new FormControl('', [Validators.required]),
    descricaoTm: new FormControl(''),
    observacao: new FormControl(''),
    quantidadeAnimais: new FormControl('', [Validators.required]),
    idFornecedor: new FormControl(),
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
  TMTipo: number;
  animais: Array<any> = [];
  tipoMovimentacao;

  public movimentacao: Movimentacao = new Movimentacao();
  public tm: TiposMovimento = new TiposMovimento();

  constructor(
    private location: Location,
    private movimentacaoService: MovimentacaoService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.tipoMovimentacao = this.route.snapshot.paramMap.get('tipoMovimentacao');
    this.movimentacao.tipo = parseInt(this.route.snapshot.paramMap.get('tipoMovimentacao'));
  }

  backRoute() {
    this.location.back();
  }

  saveMovimentacao(): void {
    console.log(this.movimentacao);
    this.movimentacaoService.saveMovimentacao(this.movimentacao).subscribe(response => {
      if (response) {
        this.location.back();
      }
    })
  }

  editAnimal(event) {
    this.pecModal.openEditModal(event);
  }

}
