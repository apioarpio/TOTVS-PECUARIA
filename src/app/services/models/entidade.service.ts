import {Injectable} from '@angular/core';
import {PoStorageService} from "@portinari/portinari-storage";
import {ServerService} from "../utils/server.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entidade} from "../../model/entidade";
import {IntegracaoLogService} from "../utils/integracao-log.service";
import {ElectronService} from "ngx-electron";
import {SyncLog} from "../../model/syncLog";

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {


  constructor(
    private http: HttpClient,
    private electronService: ElectronService,
    private serverService: ServerService,
    private poStorageService: PoStorageService,
    private integracaoLogService: IntegracaoLogService
  ) {

  }

  /**
   * @description sincroniza as estidade do servidor com a banco de dados da aplicação
   */
  syncEntidades(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {

      try {
        const entidadesServer = await this.getEntidadesProtheus();//busca as entidades no servidor
        const REGISTROS_TOTAIS = entidadesServer.length;//armazena o numeor total de entidades retornadas
        let entidades: object[] = [];
        let registrosSalvos = 0;//armazena o numero de registros já salvos

        // if (ultimaIntegracao) {
        for (let entidade of entidadesServer) {
          let ent = new Entidade();
          let date = new Date();

          ent.createEntidade(
            entidade.CODIGO,
            entidade.NOME,
            entidade.TIPO,
            entidade.UF,
            entidade.CODMUN,
            entidade.IDSISBOV,
            entidade.INSEST,
            entidade.CNPJ,
            entidade.CODFOR,
            entidade.SIF,
            date.toLocaleString());
          entidades.push(ent.getDocument());
          registrosSalvos += 1;
        }
        let resp = await this.saveEntidadeLocal(entidades).toPromise();
        resolve(resp)
      } catch (e) {
        console.log('Erro ao sincronizar as entidades', e);
        reject(e)
      }
    })
  }

  /**
   * @author Apioarpio Phellipe Ferreira de Oliveira
   * @description busca as entidades do servidor online
   * @param recno: caso informado, retorna os registros a partir do recno informado
   */
  getEntidadesProtheus(recno?): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Portinari-No-Error': 'true'
        })
      };
      try {
        let protheusServer = await this.serverService.getProtheusServerAddress();
        if (recno) {
          this.http.get(`${protheusServer}/pecEntidade?recno=${recno}`, httpOptions)
            .subscribe(result => {
              resolve(result);
            }, error1 => {
              reject(error1)
            })
        } else {
          this.http.get(`${protheusServer}/pecEntidade`, httpOptions)
            .subscribe(result => {
              resolve(result)
            }, error1 => {
              reject(error1)
            })
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });

  }

  /**
   * @description salva a entidade na no storage
   * @param entidade
   */
  saveEntidadeLocal(entidade: object[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Portinari-No-Error': 'true'
      })
    };
    return this.http.post(`${this.serverService.sqlite}/entidade`, {entidades: entidade}, httpOptions)
  }

  getAllEntidades(indice?, limite?): Observable<any> {
    if (indice && limite) {
      return this.http.get(`${this.serverService.sqlite}/entidade?indice=${indice}&limite=${limite}`);
    } else if (indice) {
      return this.http.get(`${this.serverService.sqlite}/entidade?indice=${indice}`);
    } else if (limite) {
      return this.http.get(`${this.serverService.sqlite}/entidade?limite=${limite}`);
    } else {
      return this.http.get(`${this.serverService.sqlite}/entidade`);
    }
  }

  getEntidadesByTipo(tipo): Observable<any> {
    return this.http.get(`${this.serverService.sqlite}/entidade?tipo=${tipo}`);
  }

  getEntidadeById(idEntidade): Observable<any> {
    return this.http.get(`${this.serverService.sqlite}/entidade/${idEntidade}`)
  }

}
