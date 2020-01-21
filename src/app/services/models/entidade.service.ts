import {Injectable} from '@angular/core';
import {PoStorageService} from "@portinari/portinari-storage";
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entidade} from "../../model/entidade";
import {IntegracaoLogService} from "../utils/integracao-log.service";
import {ElectronService} from "ngx-electron";
import {SyncLog} from "../../model/syncLog";

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  private dbEntidades = new PouchDB('entidades');

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
  async syncEntidades(): Promise<any> {
    try {
      console.log(`Buscando Entidades do Servidor: ${new Date().toLocaleString()}`);
      const entidadesServer = await this.getServerEntidades().toPromise();//busca as entidades no servidor
      console.log(`Entidades do Servidor retornado: ${new Date().toLocaleString()}`);
      const REGISTROS_TOTAIS = entidadesServer.length;//armazena o numeor total de entidades retornadas
      let entidades: object[] = [];
      let registrosSalvos = 0;//armazena o numero de registros já salvos
      console.log(`Criando Array de Entidades: ${new Date().toLocaleString()}`);

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


        // let entidadeCheck: Entidade = await this.getEntidadeStorageById(ent.id);
        // arrBulkEnt.push({id: ent.id});
        // if (entidadeCheck) {
        //   // @ts-ignore
        //   ent.rev = entidadeCheck._rev; //adiciona o valor para o campo de revisão
        //   arrUpdateEntidades.push(ent);
        // }
        entidades.push(ent.getDocument());
        registrosSalvos += 1;
      }
      // console.log(`bulk get: ${new Date().toLocaleString()}`);
      // let arrRetBE = await this.dbEntidades.bulkGet({docs: arrBulkEnt});
      // console.log(`bulk get finalizado: ${new Date().toLocaleString()}`);
      // arrBulkEnt.map((value, index) => {
      //   console.log(value)
      // });
      //
      console.log(`Termino da criação do array de entidades: ${new Date().toLocaleString()}`);

      console.log(entidades)
      console.log(`inicio integração: ${new Date().toLocaleString()}`);
      let resp = await this.saveEntidadeStorage(entidades).toPromise();
      console.log(`término integração: ${new Date().toLocaleString()}`);
      console.log(resp)

      // try {
      //   console.log(entidades);
      //   let bulkPromiseChain = []
      //   let registrosSalvos = 0;
      //   console.log(`criando promises de armazenamento: ${new Date().toLocaleString()}`);
      //   while (registrosSalvos < entidades.length) {
      //     //indice do ultimo registro a ser salvo
      //     //verifica se ainda existe 100 registros a serem salvos
      //     const indiceSave = registrosSalvos + 100 > entidades.length ? entidades.length : registrosSalvos + 100;
      //     console.log(`Salvando Posição ${registrosSalvos} até ${indiceSave}`);
      //     bulkPromiseChain.push(this.bulkSaveEntidadeStorage(entidades.slice(registrosSalvos, indiceSave)));
      //     // console.log(`resultado do save:`);
      //     // console.log(resultSave);
      //     registrosSalvos = indiceSave;
      //   }
      //   // console.log(`criando promises de armazenamento finalizado: ${new Date().toLocaleString()}`);
      //   // console.log(`Armazenamento das entidades no banco local: ${new Date().toLocaleString()}`);
      //   // let resultBulk = await Promise.all(bulkPromiseChain);
      //   // console.log('result bulk', resultBulk);
      //   //
      //   // console.log(`Armazenamento de entidades no banco local finalizado: ${new Date().toLocaleString()}`);
      //   // console.log('salvando registros no log', await this.integracaoLogService.saveSync('entidade', REGISTROS_TOTAIS, registrosSalvos))
      //
      //   return {
      //     totalDeRegistros: REGISTROS_TOTAIS,
      //     registrosSalvos: registrosSalvos
      //   }
      //
      // }
      // catch (err) {
      //
      //   console.log(err);
      //
      //   return {
      //     totalDeRegistros: REGISTROS_TOTAIS,
      //     registrosSalvos: 0
      //   }
      //
      // }
      // }
    } catch (e) {
      console.log('erro');
      console.log(e);
    }
  }

  /**
   * @author Apioarpio Phellipe Ferreira de Oliveira
   * @description busca as entidades do servidor online
   * @param recno: caso informado, retorna os registros a partir do recno informado
   */
  getServerEntidades(recno?): Observable<any> {
    if (recno) {
      return this.http.get(`${this.serverService.serverAddress}/Entidades?recno=${recno}`)
    } else {
      return this.http.get(`${this.serverService.serverAddress}/Entidades`)
    }
  }

  /**
   * @description salva a entidade na no storage
   * @param entidade
   */
  saveEntidadeStorage(entidade: object[]): Observable<any> {
    return this.http.post(`${this.serverService.sqlite}/entidade`, {entidades: entidade})
  }

  bulkSaveEntidadeStorage(entidades: object[]): Promise<any> {

    console.log(`iniciando inclusão de entidades ${new Date().toLocaleString()}`);
    return this.dbEntidades.bulkDocs(entidades);

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

  getEntidadeStorageById(id): Promise<Entidade> {
    return new Promise((resolve, reject) => {
      this.dbEntidades.get(id)
        .then(entidadeResult => {
          let entidade = new Entidade();
          // @ts-ignore
          entidade.createEntidade(
            entidadeResult["_id"],
            entidadeResult["nome"],
            entidadeResult["tipoEntidade"],
            entidadeResult["uf"],
            entidadeResult["municipio"],
            entidadeResult["inscricaoEstadual"],
            entidadeResult["CPF_CNPJ"],
            entidadeResult["idSisbov"],
            entidadeResult["SIF"],
            entidadeResult["clienteFornecedor"],
            entidadeResult["dataIntegracao"],
            entidadeResult["_rev"]
          );
          resolve(entidade);
        })
        .catch(err => {
            console.log(`Erro ao encontrar a entidade: ${id}`, err);
            resolve(null);
          }
        );
    })
    // return this.poStorageService.getItemByField(`Entidades`, 'codigo', id)
  }

  getEntidadeStorageByName(name) {
    return this.poStorageService.getItemByField('Entidades', 'nome', name);
  }
}
