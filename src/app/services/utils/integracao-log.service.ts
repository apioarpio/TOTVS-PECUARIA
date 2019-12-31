import {Injectable} from '@angular/core';
import {PoStorageService} from "@portinari/portinari-storage";
// @ts-ignore
import PouchDB from "pouchdb";
// @ts-ignore
import PouchDBFind from "pouchdb-find"
import {ElectronService} from "ngx-electron";
import {SyncLog} from "../../model/syncLog";
import {HttpClient} from "@angular/common/http";
import {ServerService} from "./server.service";
import {Observable} from "rxjs";

PouchDB.plugin(PouchDBFind);

@Injectable({
  providedIn: 'root'
})
export class IntegracaoLogService {

  private db = new PouchDB('syncLog');
  private pExec = false;

  constructor(
    private electronService: ElectronService,
    private http: HttpClient,
    private serverService: ServerService
  ) {
  }

  /**
   * @description Cria um log para a sincronização realizada
   * @param tabela - tabela que foi sincronizada
   * @param registrosTotais - totais de registros a serem sincronizados
   * @param registrosSalvos - totais de registros sincronizados
   */
  saveSync(tabela: string, registrosSalvos: number): Observable<any> {
    return this.http.post(`${this.serverService.sqlite}/syncLog/createSyncLog`, {
      tabela: tabela,
      registrosSalvos: registrosSalvos
    })
  }

  getLastSync(tabela) {
    return this.http.get(`${this.serverService.sqlite}/syncLog/getLastSyncLog?tabela=${tabela}`);
  }

  /**
   * @description verifica se a tabela está atualizada
   */
  async lastDateSync(tabela): Promise<any> {

    try {

      if (!this.pExec) {
        let indexCreate = this.createIndex();
        if (indexCreate["result"] === "exists") {
          this.pExec = true;
        } else {
        }
      }

      let lastSync = await this.db.find({
        selector: {
          $and: [
            {tabela: tabela},
            {dataSync: new Date().toLocaleDateString()},
            {horaSync: {$gte: null}},
          ]
        },
        sort: [{'horaSync': 'desc'}]
      });

      if (lastSync.docs.length > 0) {
        return lastSync.docs[0]
      } else {
        return null
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async createIndex() {
    try {
      let horaSync = await this.db.createIndex({
        index: {fields: ['horaSync']}
      });

      console.log('criação de indice', horaSync);

      return true

    } catch (e) {

      return false

    }
  }
}
