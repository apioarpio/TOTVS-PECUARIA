import {Component, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Location} from '@angular/common'
import {Animal} from "../../../../model/animal";
import {MovimentacaoService} from "../../../../services/models/movimentacao.service";
import {ActivatedRoute} from "@angular/router";
import {
  PoDialogService, PoModalComponent,
  PoNotificationService, PoPopupAction,
  PoTableColumn,
  PoToasterOrientation,
  PoToasterType
} from "@portinari/portinari-ui";
import {Movimentacao, TipoMovimentacao} from "../../../../model/movimentacao";
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
import {FaixaEtaria} from "../../../../model/faixa-etaria";
import {liberadoAbateTroncoValidator} from "../tronco-validators/liberado-abate-tronco-validator";


import * as moment from 'moment';
import {LoteService} from "../../../../services/models/lote.service";
import {TiposMovimento} from "../../../../model/tipos-movimento";
import {AnimaisService} from "../../../../services/models/animais.service";
import {FaixaEtariaService} from "../../../../services/models/faixa-etaria.service";
import {PoStorageService} from "@portinari/portinari-storage";
import {SolicitacaoBrincosService} from "../../../../services/models/solicitacao-brincos.service";

@Component({
  selector: 'app-manejo-tronco-principal',
  templateUrl: './manejo-tronco-principal.component.html',
  styleUrls: ['./manejo-tronco-principal.component.scss']
})
export class ManejoTroncoPrincipalComponent implements OnInit, OnChanges {

  @ViewChild(ModalFiltrosTroncoComponent, {static: true}) modalFiltrosTronco: ModalFiltrosTroncoComponent;
  @ViewChild('buttonSettings', {read: ElementRef, static: true}) buttonSettingsRef: ElementRef;
  @ViewChild('sisbovInput', {read: ElementRef, static: true}) sisbovInput: ElementRef;
  @ViewChild('pesoInput', {read: ElementRef, static: true}) pesoInput: ElementRef;

  //input binds
  modalAparteDestino: EventEmitter<boolean> = new EventEmitter<boolean>();
  //Property binds
  disabledFields = {
    aparte: "false",
    manejo: "true",
    sexo: "true",
    codigoRaca: "true",
    dataNascimento: "true",
    dataLimiteHilton: "true",
    dataUltimaPesagem: "true",
    codLoteOrigem: "true",
    rfid: "true",
    umbigo: "true",
    frame: "true"
  };
  //models
  animal: Animal = new Animal(); //animal a ser incluído no manejo
  animalValido: boolean = false;
  movimentacao: Movimentacao = new Movimentacao();
  animaisMovimento = [];
  idMovimentacao;
  filtroTronco: FiltroTronco = new FiltroTronco();
  faixasEtarias: Array<FaixaEtaria> = [];
  //Lookup columns
  public readonly racaAnimalLookupColumns = [
    {property: 'id', label: 'Código'},
    {property: 'descricao', label: 'Descrição'},
    {property: 'codigoReduzido', label: 'Código Reduzido'}
  ];
  public readonly actionsSettings: Array<PoPopupAction> = [
    {label: 'Filtro do Tronco', action: this.abrirModalFiltros},
    {
      label: 'Aparte x Area/Lote', action: () => {
        this.modalAparteDestino.emit(true)
      }
    }
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
    private solicitacaoBrincoService: SolicitacaoBrincosService,
    //portinari
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private poStorageService: PoStorageService,
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
      movimento = movimento['items'][0];
      let tipoMov: TiposMovimento = new TiposMovimento();
      tipoMov.idTm = movimento['tipoMovimento']['idTm'];
      tipoMov.descricao = movimento['tipoMovimento']['descricao'];
      tipoMov.tipo = movimento['tipoMovimento']['tipo'];
      tipoMov.codigoCertificadora = movimento['tipoMovimento']['codigoCertificadora'];
      tipoMov.status = movimento['tipoMovimento']['status'];
      tipoMov.brincoEletronico = movimento['tipoMovimento']['brincoEletronico'];
      tipoMov.incluiSisbov = movimento['tipoMovimento']['incluiSisbov'];
      tipoMov.pesaAnimal = movimento['tipoMovimento']['pesaAnimal'];
      tipoMov.sanitario = movimento['tipoMovimento']['sanitario'];
      tipoMov.vinculaLote = movimento['tipoMovimento']['vinculaLote'];
      tipoMov.vinculaArea = movimento['tipoMovimento']['vinculaArea'];
      tipoMov.tipoSaida = movimento['tipoMovimento']['tipoSaida'];
      tipoMov.tipoEntrada = movimento['tipoMovimento']['tipoEntrada'];

      this.movimentacao.id = movimento['idMovimentacao'];
      this.movimentacao.tipo = movimento['tipo'];
      this.movimentacao.idFornecedor = movimento['idFornecedor'];
      this.movimentacao.idFazenda = movimento['idFazenda'];
      this.movimentacao.quantidadeAnimal = movimento['quantidadeAnimal'];
      this.movimentacao.tipoMovimento = tipoMov;


      this.validacoesMovimentacaoEntrada();

    });
    this.getAnimaisMovimento();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes', changes)
  }

  /**
   * @description adiciona o animal informado para validação no tronco
   * @param sisbov
   */
  async setAnimalMovimentacao(sisbov: number) {
    try {
      let sisbovValido = ManejoTroncoPrincipalComponent.validaSisbov(sisbov.toString());
      let inputSisbov: HTMLInputElement = this.sisbovInput.nativeElement;

      if (sisbovValido) {
        //busca o animal pelo sisbov informado
        let animal: Animal = await this.animalService.getAnimalBySisbov(sisbov);
        //chama a função de acordo com o tipo da movimentacao
        if (this.movimentacao.tipo === 1) { // entrada
          this.validacoesAnimalEntrada(animal)
        } else if (this.movimentacao.tipo === 2) { // movimentacao interna
          this.validacoesAnimalManejo(animal)
        } else if (this.movimentacao.tipo === 3) { // saida
          this.validacoesAnimalSaida(animal)
        }
        this.validaHabilitacaoDeCampos()
      } else {
        this.sendWarningNotificationTop(`SISBOV ${sisbov} Inválido.`);
        this.animal.sisbov = null;
        inputSisbov.focus()
      }
    } catch (e) {
      console.log('erro ao buscar o animal: ', e);
    }
  }

  /**
   * @description função disparada no momento em que uma raça é selecionada no lookup
   * @param raca
   */
  onRacaSelect(raca) {
    this.animal.nomeRaca = raca.descricao ? raca.descricao : null;
  }

  /**
   * @description adiciona o animal ao manejo
   */
  async addAnimal() {
    try {
      //verifica se existe algum destino pré selecionado para este aparte
      let existeAparteDestino = await this.poStorageService.exists(`movimentacao.${this.movimentacao.id}`);
      if (existeAparteDestino) {
        let destino = await this.poStorageService.getItemByField(`movimentacao.${this.movimentacao.id}`, 'aparte', this.animal.aparte);
        if (destino) {
          this.saveAnimalMovimentacao(destino['codigoArea'], destino['codigoLote']);
        }
      } else {
        this.saveAnimalMovimentacao(null, null);
      }
    } catch (e) {
      console.log(e)
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
      this.disabledFields.aparte = "true";
      this.animal.aparte = filtro.aparte
    } else {
      this.disabledFields.aparte = "false";
      this.animal.aparte = null
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

  private saveAnimalMovimentacao(area, lote) {
    this.movimentacaoService
      .addAnimalMovimentacao(this.animal, this.movimentacao, area, lote)
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

  // ================================ Validações ================================

  /**
   * @description verifica se o número do sisbov é válido, com base nas regras de calculo comparadas com o seu digito verificador
   * @param sisbov
   */
  static validaSisbov(sisbov: string) {
    if (sisbov.length === 15) {
      let digitoVerificador = parseInt(sisbov.substr(14, 1)); // digito verificador, ultimo número do sisbov
      let digitosMultiplicadores = [9, 8, 7, 6, 5, 4, 3, 2];
      let codigoManejo = sisbov.substr(6, 8); //manejo do sisbov, equivale aos ultimos 8 digitos, excluindo o digitor verificador
      let valorManejo = 0;
      let valorMult = 0;

      for (let i = 0; i < 8; i++) {
        valorManejo = parseInt(codigoManejo.substr(i, 1));
        valorMult += valorManejo * digitosMultiplicadores[i];
      }
      valorMult = (valorMult * 10) % 11;
      if (valorMult > 9) {
        valorMult = 0;
      }
      return valorMult === digitoVerificador;
    } else {
      return false
    }
  }

  /**
   * @description valida solicitação de brinco do sisbov informado. caso haja uma solicitação,
   * preenche o campo da solicitação dos brincos e retorna a solicitação. caso não não exista
   * uma solicitação, rejeita a promisse.
   * @param sisbov
   * @param idFazenda
   */
  validaSolicitacaoSisbov(sisbov: string, idFazenda: number) {
    return new Promise((resolve, reject) => {
      this.solicitacaoBrincoService
        .validaSolicitacaoBrinco(sisbov).subscribe(result => {
        if (result) {

          this.animal.numeroSolSisbov = result['idSolicitacao'];

          resolve(result)
        } else {
          reject(false)
        }
      }, err => {
        console.log(err);
        reject(false)
      })
    });
  }

  /**
   * @description Validações realizadas ao informar um sisbov animal, caso o tipo da movimenação seja uma entrada
   */
  validacoesAnimalEntrada(animalBusca: Animal) {

    // caso seja uma compra ou cadastro
    if (this.movimentacao.tipoMovimento.tipoEntrada === 2 || this.movimentacao.tipoMovimento.tipoEntrada === 3) {
      //se o animal já existe
      if (animalBusca.sisbov) {
        this.sendWarningNotificationTop('Animal já cadastrado');
        this.animal.sisbov = null;
      } else {
        //valida requisição brinco
        this.validaSolicitacaoSisbov(this.animal.sisbov, 1)
          .then(result => {
            this.animalValido = true;
            this.validaHabilitacaoDeCampos();
          })
          .catch(err => {
            this.animalValido = false;
            this.sendWarningNotificationTop('Solicitação de Brinco não encontrada para o sisbov informado.')
          });
      }
    } else { // caso seja transferencia
      if (animalBusca.hasOwnProperty('sisbov')) {
        //TODO retificar para criar um novo animal como objeto e atribuir para o animal da classe;
        this.animal = animalBusca;
      } else {
        this.sendWarningNotificationTop('Animal não cadastrado');
      }
    }
  }

  /**
   * @description Validações realizadas ao informar um sisbov animal, caso o tipo da movimenação seja uma saida
   */
  validacoesAnimalSaida(animalBusca) {
    if (animalBusca) {
      this.animal = animalBusca
    } else {
    }
  }

  /**
   * @description Validações realizadas ao informar um sisbov animal, caso o tipo da movimenação seja um manejo
   */
  validacoesAnimalManejo(animalBusca) {
    if (animalBusca) {
      this.animal = animalBusca
    } else {
    }
  }

  /**
   * @description verifica os parâmetros da movimentação e aplica as validações necessárias.
   */
  private validacoesMovimentacaoEntrada() {
    //verifica se o tipo de entrada inclui sisbov e se é cadastro ou compra
    console.log(this.movimentacao);
    if (
      this.movimentacao.tipoMovimento.incluiSisbov === 1 &&
      (this.movimentacao.tipoMovimento.tipoEntrada === 2 || this.movimentacao.tipoMovimento.tipoEntrada === 3)
    ) {
      this.troncoFormGroup.controls['sexo'].setValidators([sexoTroncoValidator(this.filtroTronco), Validators.required]);
      this.troncoFormGroup.controls['peso'].setValidators([pesoValidator(this.filtroTronco), Validators.required]);
      this.troncoFormGroup.controls['raca'].setValidators([racaTroncoValidator(this.filtroTronco), Validators.required]);
      this.troncoFormGroup.controls['dataNascimento'].setValidators([faixaEtariaTroncoValidator(this.filtroTronco, this.animal, this.faixasEtarias), Validators.required]);
    } else if (this.movimentacao.tipoMovimento.tipoEntrada === 1) {
      this.disabledFields.sexo = "true";
      this.disabledFields.manejo = "true";
      this.disabledFields.codigoRaca = "true";
      this.disabledFields.dataNascimento = "true";
      this.disabledFields.dataLimiteHilton = "true";
      this.disabledFields.rfid = "true";
      this.disabledFields.umbigo = "true";
      this.disabledFields.frame = "true";
    }
  }

  /**
   * @description verifica quais campos devem ser habilitados ou desabilidatos com base nos parâmetros da movimentacao.
   * Ex:
   *  Caso a movimentação for do tipo entrada e o tipo da movimentação for cadastro, deve ser liberado todos os campos para preenchimento.
   */
  private validaHabilitacaoDeCampos() {
    if (this.movimentacao.tipo === TipoMovimentacao.ENTRADA && this.animalValido) {
      if (this.movimentacao.tipoMovimento.tipoEntrada === 2 || this.movimentacao.tipoMovimento.tipoEntrada === 3) {
        this.disabledFields.sexo = "false";
        this.disabledFields.codigoRaca = "false";
        this.disabledFields.dataNascimento = "false";
      }
    } else {
      this.disabledFields.sexo = "true";
      this.disabledFields.codigoRaca = "true";
      this.disabledFields.dataNascimento = "true";
    }
  }

  // ================================ EVENTOS ================================
  /**
   * @description função para handler dos eventos de focusOut
   * @param event
   */
  onFocusOut(event) {
    let valor = event.target.value; // valor do campo que ocorreu o evento
    let campo = event.target.id; //id do campo onde ocorreu o evento

    console.log(parseInt(valor));

    if (campo === "sisbov") {
      if (valor) {
        this.setAnimalMovimentacao(parseInt(valor))
      } else {
        this.animalValido = false;
        this.animal.peso = null;
      }
    }
  }

  onKeyUp(event) {
    console.log(event)
  }

  onKeyDown(event) {
    console.log(event)
  }

  onKeyPress(event) {
    console.log(event)
  }

  //==================================== Funções Genéricos ====================================

  sendNotificationTop(notificação) {
    this.poNotification.createToaster({
      action: undefined,
      actionLabel: '',
      duration: 5000,
      type: PoToasterType.Information,
      message: notificação,
      componentRef: null,
      position: null,
      orientation: PoToasterOrientation.Top
    })
  }

  sendWarningNotificationTop(notificação) {
    this.poNotification.createToaster({
      action: undefined,
      actionLabel: '',
      duration: 5000,
      type: PoToasterType.Warning,
      message: notificação,
      componentRef: null,
      position: null,
      orientation: PoToasterOrientation.Top
    })
  }

}
