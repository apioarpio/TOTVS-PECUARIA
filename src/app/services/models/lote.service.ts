import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Lote} from "../../model/lote";
import {Observable} from "rxjs";
import {ContextoService} from "../contexto.service";

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

  syncLotesProtheus() {
    return new Promise(async (resolve, reject) => {
      let idFazenda = await this.contextoService.getFazenda();
      this.getAllLotesProtheus(idFazenda)
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

  getAllLotes(idFazenda: number): Promise<Array<Lote> | Lote> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.serverService.sqlite}/lote?idFazenda=${idFazenda}`)
        .subscribe(result => {
          let lotes: Array<Lote> = [];
          if (Array.isArray(result)) {
            for (let l of result) {
              let lote: Lote = new Lote();
              lote.idLote = l['id_lote'];
              lote.idFazenda = l['id_fazenda'];
              lote.idArea = l['id_area'];
              lote.nome = l['nome'];
              lote.tipoLote = l['tipo_lote'];
              lote.status = l['status'];
              lote.quantidadeAnimais = l['quantidade_animais'];
              lote.ano = l['ano'];
              lote.mes = l['mes'];
              lote.sexo = l['sexo'];
              lote.observacao = l['observacao'];
              lotes.push(lote)
            }
            resolve(lotes)
          } else {
            let lote: Lote = new Lote();
            lote.idLote = result['id_lote'];
            lote.idFazenda = result['id_fazenda'];
            lote.idArea = result['id_area'];
            lote.nome = result['nome'];
            lote.tipoLote = result['tipo_lote'];
            lote.status = result['status'];
            lote.quantidadeAnimais = result['quantidade_animais'];
            lote.ano = result['ano'];
            lote.mes = result['mes'];
            lote.sexo = result['sexo'];
            lote.observacao = result['observacao'];
            resolve(lote);
          }
        })
    })
  }

  getAllLotesSubscribe(): Observable<any> {
    return new Observable((observe) => {
      this.contextoService.getFazenda().then(idFazenda => {
        this.http.get(`${this.serverService.sqlite}/lote?idFazenda=${idFazenda}`).subscribe(result => {
          observe.next(result)
        }, err => {
          observe.error(err);
        })
      })
    })
  }

  getLoteLocalByIdSubscribe(id: string): Observable<any> {
    return new Observable((observe) => {
      this.contextoService.getFazenda().then(idFazenda => {
        this.http.get(`${this.serverService.sqlite}/lote/${id}?idFazenda=${idFazenda}`)
          .subscribe(result => {
            observe.next(result)
          }, err => {
            observe.error(err)
          })
      })
        .catch(err => {
          observe.error(err)
        })
    });
  }

  getLoteLocalById(id: number): Promise<Lote> {

    return new Promise((resolve, reject) => {
      let getLote = this.http.get(`${this.serverService.sqlite}/lote/${id}`)
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
        let getLotes = this.http.get(`${this.serverService.protheusAddress}/rest/pecLoteAnimal?codArea=1&codFazenda=${idFazenda}`);
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
