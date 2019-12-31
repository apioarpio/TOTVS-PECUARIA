import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  private statusSyncAnimais: boolean = false;
  private statusSyncEntidades: boolean = false;

  isSync: EventEmitter<boolean> = new EventEmitter();

  constructor() {

  }

  /**
   * @description verifica se alguma tabela esta sendo sincronizada. enquanto uma sincornização estiver em andamento, o evento irá emitir
   * a resposta como verdadeiro. caso todas as tabelas estejam fora de sincronísmo, será emitido o evento como falso.
   */
  emitSync(): void {
    if (!this.statusSyncAnimais &&
      !this.statusSyncEntidades) {
      this.isSync.emit(false);
    } else {
      this.isSync.emit(true);
    }
  }

  /**
   * @description atualiza os status de atualização das tabelas
   * @param tableName = nome da tabela a ser sincornizada
   */
  setStartSyncTable(tableName: TablesSync): void {
    if (tableName === TablesSync.ANIMAL) {
      this.statusSyncAnimais = true;
    } else if (tableName === TablesSync.TM) {
      this.statusSyncEntidades = true;
    }
    this.emitSync();
  }

  setStopSynctable(tableName: TablesSync): void {
    if (tableName === TablesSync.ANIMAL) {
      this.statusSyncAnimais = false;
    } else if (tableName === TablesSync.TM) {
      this.statusSyncEntidades = false;
    }
    this.emitSync();
  }

}

export enum TablesSync {
  ANIMAL = 1,
  TM = 2
}
