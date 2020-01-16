import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Lote} from "../../model/lote";
import {Observable} from "rxjs";
import {ContextoService} from "../contexto.service";
import {error} from "selenium-webdriver";

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(
    private http: HttpClient,
    private serverService: ServerService,
    private contextoService: ContextoService
  ) {
  }

  syncLotesProtheus(fazenda) {
    return new Promise((resolve, reject) => {
      this.getAllLotesProtheus(fazenda)
        .then(result => {
          const quantidadeLotes = result.length;
          let arrPromisesSave = [];
          let lotesSalvos: number = 0;
          let lotesErro: number = 0;

          for (let lote of result) {
            arrPromisesSave.push(
              this.saveLoteLocal(lote).toPromise()
                .then(result => {
                  lotesSalvos += 1;
                })
                .catch(err => {
                  console.log(err);
                  lotesErro += 1
                })
            );
          }

          Promise.all(arrPromisesSave).then(result => {
            console.log(result)
            console.log(quantidadeLotes);
            console.log(lotesSalvos);
            console.log(lotesErro);
            resolve()
          })

        })
        .catch(err => {
          console.log(err);
          reject()
        })
    })

  }

  getLoteLocalById(id: number): Promise<Lote> {

    return new Promise((resolve, reject) => {
      let getLote = this.http.get(`${this}/area/${id}`)
    })

  }

  /**
   * @description Valida se o lote já foi cadastrado no offline, caso já tenha sido criado.
   */
  checkLoteOfflineSync() {

  }

  /**
   * @description Busca os lotes no ERP protheus.
   */
  getAllLotesProtheus(idFazenda): Promise<Lote[]> {
    return new Promise((resolve, reject) => {
        let lotes: Lote[] = [];
        let getLotes = this.http.get(`${this.serverService.protheusAddress}/rest/pecLoteAnimal?codArea=${idFazenda}`);

        getLotes.subscribe(result => {
          if (Array.isArray(result)) {
            if (result.length) {
              for (let lote of result) {
                let loteObj = new Lote();
                loteObj.idLote = lote['codigo'];
                loteObj.idFazenda = lote['codigoFazenda'];
                loteObj.idArea = lote['codigoArea'];
                loteObj.nome = lote['nome'];
                loteObj.tipoLote = lote['tipo'];
                loteObj.sexo = lote['sexo'];
                loteObj.status = lote['status'];
                loteObj.quantidadeAnimais = lote['qtdAnimais'];
                loteObj.ano = lote['ano'];
                loteObj.mes = lote['mes'];
                loteObj.observacao = lote['obs'];
                loteObj.dataAtualizacao = lote['dataAtualizacao'];
                loteObj.deletado = !!lote['deleted'];
                lotes.push(loteObj);
              }
              resolve(lotes);
            } else {
              console.log('Nenhum registro encontrado');
              reject()
            }
          } else {
            console.log('Nenhum registro encontrado');
            resolve()
          }

        }, err => {
          if (err) {
            console.log(err);
            getLotes.subscribe();
            reject();
          }
        });
      }
    );
  }

  saveLoteLocal(lote: Lote): Observable<any> {
    return this.http.post(`${this.serverService.sqlite}/lote`, {
      lote: {
        idLote: lote.idLote,
        idFazenda: lote.idFazenda,
        idArea: lote.idArea,
        nome: lote.nome,
        tipoLote: lote.tipoLote,
        status: lote.status,
        quantidadeAnimais: lote.quantidadeAnimais,
        ano: lote.ano,
        mes: lote.mes,
        sexo: lote.sexo,
        observacao: lote.observacao,
        deletado: lote.deletado
      }
    })
  }

}
