import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-manejo-tronco-principal',
  templateUrl: './manejo-tronco-principal.component.html',
  styleUrls: ['./manejo-tronco-principal.component.scss']
})
export class ManejoTroncoPrincipalComponent implements OnInit {

  @ViewChild(ModalFiltrosTroncoComponent, {static: true}) modalFiltrosTronco: ModalFiltrosTroncoComponent;

  public columns: PoTableColumn[] = [
    {label: 'SISBOV', property: 'sisbov', type: 'number'},
    {label: 'Peso', property: 'peso', type: 'number'},
    {label: 'Aparte', property: 'aparte'},
    {label: 'Faixa Etária', property: 'faixaEtaria'}
  ];

  public items: Array<any> = [];

  animal: Animal = new Animal();
  aparte: number;
  pesoAnimal: number;
  movimentacao: Movimentacao = new Movimentacao();
  animaisMovimento = [];
  idMovimentacao;
  filtroTronco: FiltroTronco = new FiltroTronco();

  constructor(
    private localtion: Location,
    private http: HttpClient,
    private animalService: AnimaisService,
    private route: ActivatedRoute,
    private movimentacaoService: MovimentacaoService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService
  ) {
  }

  ngOnInit() {
    this.idMovimentacao = this.route.snapshot.paramMap.get('idMovimentacao');
    this.movimentacaoService.getMovimentacoesById(this.idMovimentacao, null).subscribe(movimento => {
      console.log(movimento)
      this.movimentacao = movimento['items'][0];
    });
    this.getAnimaisMovimento();
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
   * @description
   */
  addAnimal() {
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

  aplicarFiltro(filtro: FiltroTronco) {
    console.log(filtro)
    this.filtroTronco = filtro
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
