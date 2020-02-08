import {Injectable} from '@angular/core';
import {PoStorageService} from "@portinari/portinari-storage";
import {ElectronService} from "ngx-electron";
import {SyncLog} from "../../model/syncLog";
import {HttpClient} from "@angular/common/http";
import {ServerService} from "./server.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IntegracaoLogService {

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
    return null
  }

  async createIndex() {
    return null
  }
}
