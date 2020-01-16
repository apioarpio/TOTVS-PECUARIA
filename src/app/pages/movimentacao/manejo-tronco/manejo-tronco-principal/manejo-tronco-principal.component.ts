import {Component, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Location} from '@angular/common'
import {AnimaisService} from "../../../../services/cadastros/animais.service";
import {Animal} from "../../../../model/animal";
import {MovimentacaoService} from "../../../../services/models/movimentacao.service";
import {ActivatedRoute} from "@angular/router";
import {
  PoDialogService,
  PoNotificationService,
  PoTableColumn,
  PoToasterOrientation,
  PoToasterType
} from "@portinari/portinari-ui";
import {Movimentacao} from "../../../../model/movimentacao";
import {HttpClient} from "@angular/common/http";
import {
  FiltroTronco,
  ModalFiltrosTroncoComponent
} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {pesoValidator} from "../tronco-validators/peso-tronco-validator";
import {sexoTroncoValidator} from "../tronco-validators/sexo-tronco-validator";
import {RacaAnimalLookupFilterService} from "../../../../services/lookup/raca-animal-lookup-filter.service";
import {racaTroncoValidator} from "../tronco-validators/raca-tronco-validator";
import {faixaEtariaTroncoValidator} from "../tronco-validators/faixa-etaria-tronco-validator";
import {FaixaEtariaService} from "../../../../services/cadastros/faixa-etaria.service";
import {FaixaEtaria} from "../../../../model/faixa-etaria";
import {liberadoAbateTroncoValidator} from "../tronco-validators/liberado-abate-tronco-validator";


import * as moment from 'moment';
import {LoteService} from "../../../../services/models/lote.service";

@Component({
  selector: 'app-manejo-tronco-principal',
  templateUrl: './manejo-tronco-principal.component.html',
  styleUrls: ['./manejo-tronco-principal.component.scss']
})
export class ManejoTroncoPrincipalComponent implements OnInit, OnChanges {

  @ViewChild(ModalFiltrosTroncoComponent, {static: true}) modalFiltrosTronco: ModalFiltrosTroncoComponent;

  //Property binds
  aparteDisabled: boolean = false;

  //models
  animal: Animal = new Animal(); //animal a ser incluído no manejo
  aparte: number; //aparte selecionado
  pesoAnimal: number; //peso do animal informaod pelo usuário
  movimentacao: Movimentacao = new Movimentacao();
  animaisMovimento = [];
  idMovimentacao;
  filtroTronco: FiltroTronco = new FiltroTronco();
  faixasEtarias: Array<FaixaEtaria> = [];
  //Lookup columns
  readonly racaAnimalLookupColumns = [
    {property: 'id', label: 'Código'},
    {property: 'descricao', label: 'Descrição'},
    {property: 'codigoReduzido', label: 'Código Reduzido'}
  ];
  public troncoFormGroup = new FormGroup({
    sisbov: new FormControl('', [Validators.required, liberadoAbateTroncoValidator(this.filtroTronco, this.animal)]),
    peso: new FormControl('', [Validators.required, pesoValidator(this.filtroTronco)]),
    aparte: new FormControl(''),
    manejo: new FormControl(''),
    codigoRaca: new FormControl(''),
    raca: new FormControl('', [racaTroncoValidator(this.filtroTronco)]),
    sexo: new FormControl('', [sexoTroncoValidator(this.filtroTronco)]),
    idadeMeses: new FormControl(''),
    dataNascimento: new FormControl('', [faixaEtariaTroncoValidator(this.filtroTronco, this.animal, this.faixasEtarias)]),
    dataLimiteHilton: new FormControl(),
    dataUltimaPesagem: new FormControl(),
    codLoteOrigem: new FormControl(),
    rfid: new FormControl(),
    umbigo: new FormControl(),
    frame: new FormControl()
  });
  public columns: PoTableColumn[] = [
    {label: 'SISBOV', property: 'sisbov', type: 'number'},
    {label: 'Peso', property: 'peso', type: 'number'},
    {label: 'Aparte', property: 'aparte'},
    {label: 'Faixa Etária', property: 'faixaEtaria'}
  ];
  public items: Array<any> = [];

  constructor(
    //angular
    private localtion: Location,
    private http: HttpClient,
    private route: ActivatedRoute,
    //services
    private animalService: AnimaisService,
    private faixaEtariaService: FaixaEtariaService,
    private movimentacaoService: MovimentacaoService,
    private loteService: LoteService,
    //portinari
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    //lookup filters
    public racaAnimalLookupFilterService: RacaAnimalLookupFilterService,
  ) {

    //seta o moment para portugues
    moment.locale('pt');

    faixaEtariaService.getFaixaEtariaLocal().subscribe(result => {
      for (let faixaEtaria of result['items']) {
        this.faixasEtarias.push(faixaEtaria);
      }
    })

  }

  ngOnInit() {

    this.idMovimentacao = this.route.snapshot.paramMap.get('idMovimentacao');
    this.movimentacaoService.getMovimentacoesById(this.idMovimentacao, null).subscribe(movimento => {
      console.log(movimento);
      this.movimentacao = movimento['items'][0];
    });
    this.getAnimaisMovimento();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes', changes)
  }

  /**
   * @description função chamada no momento em que o focus do campo "SISBOV" termina. extraindo o valor do campo
   * e realizando a chamada da função getAnimal()
   * @param event
   */
  onFocusOutManejo(event) {
    let sisbov = event.target.valueAsNumber;
    if (sisbov) {
      this.getAnimal(sisbov)
    }
  }

  /**
   * @description busca o animal na base offline com base no sisbov informado
   * @param sisbov
   */
  getAnimal(sisbov: number) {
    this.animalService.getAnimalBySisbov(sisbov).subscribe(result => {
      let animal = result['animal'][0];
      if (animal) {
        this.animal = new Animal();
        this.animal.id = animal.id_animal;
        this.animal.sisbov = animal.sisbov;
        this.animal.manejo = animal.manejo;
        this.animal.raca = animal.raca;
        this.animal.nomeRaca = animal.nomeRaca;
        this.animal.sexo = animal.sexo;
        this.animal.dataNascimento = animal.dataNascimento;
        this.animal.dataIncSisbov = animal.dataIncSisbov;
        this.animal.codFAixaEtaria = animal.codFAixaEtaria;
        this.animal.peso = animal.peso;
        this.animal.dataPesagem = animal.dataPesagem;
        this.animal.codFazenda = animal.codFazenda;
        this.animal.codFornecedor = animal.codFornecedor;
        this.animal.numeroSolSisbov = animal.numeroSolSisbov;
        this.animal.dataEntrada = animal.dataEntrada;
        this.animal.movimentoOrigem = animal.movimentoOrigem;
        this.animal.rfid = animal.rfid;
        this.animal.lote = animal.lote;
        this.animal.pasto = animal.pasto;
        this.animal.dataLibAbateCertificadora = animal.dataLibAbateCertificadora;
        this.animal.dataAbate = animal.dataAbate;
        this.animal.dataLibAbateSanitario = animal.dataLibAbateSanitario;
        this.animal.dataApontamentoMorte = animal.dataApontamentoMorte;
        this.animal.controleWebservice = animal.controleWebservice;
        this.animal.status = animal.status;
        this.animal.dataLimiteCotaHilton = animal.dataLimiteCotaHilton;
        this.animal.cadastro = animal.cadastro;
        this.animal.dataAtualizacaoAnimal = animal.dataAtualizacaoAnimal;
        this.animal.fazendaOrigem = animal.fazendaOrigem;
        this.animal.certificadora = animal.certificadora;
        this.animal.dataCertificadora = animal.dataCertificadora;
        this.animal.controleTransferencia = animal.controleTransferencia;
      } else {
        this.animal = new Animal()
      }
    })
  }

  /**
   * @description função disparada no momento em que uma raça é selecionada no lookup
   * @param raca
   */
  onRacaSelect(raca) {
    this.animal.nomeRaca = raca.descricao ? raca.descricao : null;
  }

  /**
   * @description
   */
  addAnimal() {
    this.validaFiltroTronco();
    if (this.aparte) {
      this.poDialog.confirm({
        title: 'Adicionar Animal',
        message: `Deseja confirmar o envio do animal ${this.animal.sisbov} para o aparte ${this.aparte}`,
        confirm: () => this.saveAnimalMovimentacao()
      });
    } else {
      this.poNotification.createToaster({
        action: undefined,
        actionLabel: '',
        duration: 5000,
        type: PoToasterType.Warning,
        message: `Favor Selecionar o aparte de destino.`,
        componentRef: null,
        position: null,
        orientation: PoToasterOrientation.Top
      });
    }
  }

  backRoute() {
    this.localtion.back();
  }

  getAnimaisMovimento() {
    this.movimentacaoService.getAnimaisMovimentacao(this.idMovimentacao).subscribe(result => {
      // @ts-ignore
      this.animaisMovimento = result;
      this.updateAnimaisMovimentoTable()
    })
  }

  abrirModalFiltros() {
    this.modalFiltrosTronco.open()
  }

  calculateIdadeMeses(): void {
    let dataInicial = moment(this.animal.dataNascimento);
    let dataAtual = moment();
    let meses = dataInicial.diff(dataAtual, 'month');

    this.animal.idadeMeses = meses === 0 || meses > 0 ? 1 : Math.abs(meses);

  }

  /**
   * @description Aplica os filtros selecionados
   * @param filtro
   */
  setFiltros(filtro: FiltroTronco) {
    this.filtroTronco = filtro;
    this.setCustomValidators();
    //define o aparte conforme selecionado no filtro, impossibilitando a mudança do mesmo até o filtro ser retirado
    if (filtro.aparte) {
      this.aparteDisabled = true;
      this.aparte = filtro.aparte
    } else {
      this.aparteDisabled = false;
      this.aparte = null
    }
    this.troncoFormGroup.updateValueAndValidity();
    Object.keys(this.troncoFormGroup.controls).forEach(field => {
      const control = this.troncoFormGroup.get(field);
      control.markAsUntouched({onlySelf: true});
      control.markAsTouched({onlySelf: true});
      control.updateValueAndValidity({onlySelf: false, emitEvent: true});
      console.log(control);
    });
    console.log(this.troncoFormGroup)
  }

  private setCustomValidators() {
    this.troncoFormGroup.controls['sexo'].setValidators([sexoTroncoValidator(this.filtroTronco)]);
    this.troncoFormGroup.controls['peso'].setValidators([pesoValidator(this.filtroTronco)]);
    this.troncoFormGroup.controls['raca'].setValidators([racaTroncoValidator(this.filtroTronco)]);
    this.troncoFormGroup.controls['dataNascimento'].setValidators([faixaEtariaTroncoValidator(this.filtroTronco, this.animal, this.faixasEtarias)]);
    this.troncoFormGroup.updateValueAndValidity();
  }

  private validaFiltroTronco(): boolean {
    let isValid = true;
    if (this.filtroTronco.sexo) {
      isValid = this.filtroTronco.sexo === this.animal.sexo;
    }
    console.log(this.troncoFormGroup);
    return isValid
  }

  private saveAnimalMovimentacao() {
    this.movimentacaoService
      .addAnimalMovimentacao(this.idMovimentacao, this.animal.id, this.aparte, this.pesoAnimal)
      .subscribe(result => {
        this.getAnimaisMovimento();
        this.poNotification.createToaster({
          action: undefined,
          actionLabel: '',
          duration: 5000,
          type: PoToasterType.Information,
          message: `Animal ${this.animal.sisbov} adicionado com sucesso`,
          componentRef: null,
          position: null,
          orientation: PoToasterOrientation.Top
        });
      }, error1 => {
        if (error1.error.cod === 1) {
          this.poNotification.createToaster({
            action: undefined,
            actionLabel: '',
            duration: 5000,
            type: PoToasterType.Error,
            message: `Animal ${this.animal.sisbov} já foi adicionado nesta movimentação`,
            componentRef: null,
            position: null,
            orientation: PoToasterOrientation.Top
          });
        } else {
          this.poNotification.createToaster({
            action: undefined,
            actionLabel: '',
            duration: 5000,
            type: PoToasterType.Error,
            message: `Não foi possíve adicionar o animal na movimentação: ${error1.error.mensagem}`,
            componentRef: null,
            position: null,
            orientation: PoToasterOrientation.Top
          });
        }
      })
  }

  private updateAnimaisMovimentoTable() {

    for (let animal of this.animaisMovimento) {
      console.log(animal);
      this.items.push({sisbov: animal.sisbov, aparte: animal.aparte})
    }

  }

}
