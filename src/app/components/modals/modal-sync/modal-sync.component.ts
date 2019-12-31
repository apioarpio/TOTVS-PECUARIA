import {Component, OnInit} from '@angular/core';
import {IntegracaoLogService} from "../../../services/utils/integracao-log.service";
import {SyncButton} from "../../../model/SyncButton";
import {SyncService, TablesSync} from "../../../services/utils/sync.service";
import {TiposMovimentoService} from "../../../pages/sincronismo/services/tipos-movimento.service";
import {AnimaisService} from "../../../services/cadastros/animais.service";
import {RacaAnimal} from "../../../model/raca-animal";
import {RacaAnimalService} from "../../../services/cadastros/raca-animal.service";
import {FaixaEtariaService} from "../../../services/cadastros/faixa-etaria.service";

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
    private tiposMovimentoService: TiposMovimentoService,
    private animaisService: AnimaisService,
    private syncService: SyncService,
    private racaAnimalService: RacaAnimalService,
    private faixaEtariaService: FaixaEtariaService
  ) {
  }

  ngOnInit() {
    this.integracaoLogService.getLastSync('animal')
      .subscribe(result => {
        if (result) {
          this.lastSyncAnimal = result
        }
      });
    this.integracaoLogService.getLastSync('tiposMovimento')
      .subscribe(result => {
        if (result) {
          this.lastSyncTM = result;
        }
      });
  }

  /**
   * @since 20/10/2019
   * @author Apioarpio Phellipe Ferreira de Oliveira
   * @description inicia o sincornismo dos animais alocados no servidor, para a base local
   */
  sincronizarAnimais() {
    this.animalSyncBtn.loading = true;
    this.animalSyncBtn.label = 'Sincronizando';
    this.syncService.setStartSyncTable(TablesSync.ANIMAL);

    this.animaisService.syncAnimais()
      .finally(() => {
        this.animalSyncBtn.loading = false;
        this.animalSyncBtn.label = 'Sincronizar';
        this.syncService.setStopSynctable(TablesSync.ANIMAL);
      });
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
        console.log('tipos de movimentacao sincronizado com sucesso');
        console.log(result);
      })
      .catch(err => {
        console.log('erro aos sincronizar os tipos de movimentacao');
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
        // this.syncService.setStopSynctable(TablesSync.TM);
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
}
