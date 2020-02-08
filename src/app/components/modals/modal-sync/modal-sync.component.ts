import {Component, OnInit} from '@angular/core';
import {IntegracaoLogService} from "../../../services/utils/integracao-log.service";
import {SyncButton} from "../../../model/SyncButton";
import {SyncService, TablesSync} from "../../../services/utils/sync.service";
import {TiposMovimentoService} from "../../../pages/sincronismo/services/tipos-movimento.service";
import {LoteService} from "../../../services/models/lote.service";
import {AreaService} from "../../../services/models/area.service";
import {AnimaisService} from "../../../services/models/animais.service";
import {RacaAnimalService} from "../../../services/models/raca-animal.service";
import {FaixaEtariaService} from "../../../services/models/faixa-etaria.service";
import {EntidadeService} from "../../../services/models/entidade.service";
import {SolicitacaoBrincos} from "../../../model/solicitacao-brincos";
import {SolicitacaoBrincosService} from "../../../services/models/solicitacao-brincos.service";

@Component({
  selector: 'app-modal-sync',
  templateUrl: './modal-sync.component.html',
  styleUrls: ['./modal-sync.component.scss']
})
export class ModalSyncComponent implements OnInit {

  lastSyncAnimal: object = {};
  lastSyncTM: object = {};
  animalSyncBtn: SyncButton = {
    loading: false,
    label: "Sincronizar",
    type: "link",
    icon: "po-icon-upload",
  };
  entidadesButtonSync: SyncButton = {
    loading: false,
    label: "Sincronizar",
    type: "link",
    icon: "po-icon-upload"
  };
  tiposMovimentoSyncBtn: SyncButton = {
    loading: false,
    label: "Sincronizar",
    type: "link",
    icon: "po-icon-upload",
  };
  racaAnimalSyncBtn: SyncButton = {
    loading: false,
    label: "Sincronizar",
    type: "link",
    icon: "po-icon-upload",
  };
  faixaEtariaSyncBtn: SyncButton = {
    loading: false,
    label: 'Sincronizar',
    type: 'link',
    icon: 'po-icon-upload'
  };

  constructor(
    private integracaoLogService: IntegracaoLogService,
    private entidadeSErvice: EntidadeService,
    private tiposMovimentoService: TiposMovimentoService,
    private animaisService: AnimaisService,
    private syncService: SyncService,
    private racaAnimalService: RacaAnimalService,
    private faixaEtariaService: FaixaEtariaService,
    private areaService: AreaService,
    private loteService: LoteService,
    private solicitacaoBrincosService: SolicitacaoBrincosService
  ) {
  }

  ngOnInit() {
  }

  /**
   * @since 20/10/2019
   * @author Apioarpio Phellipe Ferreira de Oliveira
   * @description inicia o sincornismo dos animais alocados no servidor, para a base local
   */
  sincronizarAnimais(): void {
    this.startLoadingButton(this.animalSyncBtn);
    this.syncService.setStartSyncTable(TablesSync.ANIMAL);

    this.animaisService.syncAnimais()
      .finally(() => {
        this.stopLoadingButton(this.animalSyncBtn);
        this.syncService.setStopSynctable(TablesSync.ANIMAL);
      });
  }

  sincronizarEntidades(): void {
    this.startLoadingButton(this.entidadesButtonSync);
    this.entidadeSErvice.syncEntidades()
      .then(result => {
        console.log('sincronizado')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.stopLoadingButton(this.entidadesButtonSync);
      })
  }

  /**
   * @since 17/11/2019
   * @author Apioarpio Phellipe Ferreira de Oliveira
   * @description inicia a sincronização dos animais alocados no servidor, para a base local
   */
  sincronizarTiposMovimento() {

    this.tiposMovimentoSyncBtn.label = 'Sincronizando';
    this.tiposMovimentoSyncBtn.loading = true;
    this.syncService.setStartSyncTable(TablesSync.TM);

    this.tiposMovimentoService.syncTMs()
      .then(result => {
        console.log('tipos de operacoes-curral sincronizado com sucesso');
        console.log(result);
      })
      .catch(err => {
        console.log('erro aos sincronizar os tipos de operacoes-curral');
        console.log(err)
      })
      .finally(() => {
        this.tiposMovimentoSyncBtn.label = 'Sincronizar';
        this.tiposMovimentoSyncBtn.loading = false;
        this.syncService.setStopSynctable(TablesSync.TM);
      })
  }

  /**
   * @description inicia a sincronização dos animais alocados no servidor, para a base local
   */
  sincronizarRaca() {
    this.racaAnimalSyncBtn.label = 'Sincronizando';
    this.racaAnimalSyncBtn.loading = true;
    // this.syncService.setStartSyncTable(TablesSync.TM);

    this.racaAnimalService.syncRacaAnimaisProtheus()
      .then(result => {
        console.log('Raças sincronizado com sucesso');
        console.log(result);
      })
      .catch(err => {
        console.log('erro aos sincronizar as Raças');
        console.log(err)
      })
      .finally(() => {
        this.racaAnimalSyncBtn.label = 'Sincronizar';
        this.racaAnimalSyncBtn.loading = false;
        this.syncService.setStopSynctable(TablesSync.TM);
      })
  }

  /**
   * @description Inicia a sincronização das faixas etárias alocadas do servidor, para a base local
   */
  sincronizarFaixaEtaria() {

    this.faixaEtariaService.syncFaixaEtariaProtheuLocal()
      .then(result => {
        console.log(result);
        console.log('Faixas Etárias sincronizadas com sucesso')
      })
      .catch(err => {
        console.log(err);
        console.log('Erro ao sincronizar ')
      })

  }

  sincronizarLotes() {

    this.loteService.syncLotesProtheus()
      .then(result => {
        console.log(result)
      })

  }

  sincronizarAreas() {
    this.areaService.syncAreasProtheus()
      .then(result => {
        console.log(result)
      })
  }

  sincronizarSolicitacoesBrinco() {
    this.solicitacaoBrincosService.syncProtheus()
      .then(result => {
      })
      .catch(() => {
      })
  }

  /**
   * @description
   */
  private startLoadingButton(btn: SyncButton): void {
    btn.loading = true;
    btn.label = 'Sincronizando';
  }

  private stopLoadingButton(btn: SyncButton): void {
    btn.loading = false;
    btn.label = 'Sincronizar';
  }

}
