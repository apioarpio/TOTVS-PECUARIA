import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../utils/server.service";
import {Observable} from "rxjs";
import {SolicitacaoBrincos} from "../../model/solicitacao-brincos";
import {reject} from "q";
import {ContextoService} from "../contexto.service";

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoBrincosService {

  constructor(
    private http: HttpClient,
    private serverService: ServerService,
    private contextoService: ContextoService
  ) {
  }

  /**
   * @description busca os animal do ERP protheus e salva na base local
   * @param idFazenda
   */
  syncProtheus(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      let idFazenda = await this.contextoService.getFazenda();
      let solicitacoesBrinco = await this.getSolicitacoesProtheus().toPromise();
      if (solicitacoesBrinco.hasOwnProperty('items')) {
        let arrPromises: Array<Promise<any>> = [];
        for (let solicitacao of solicitacoesBrinco.items) {
          let solicitacaoBrinco: SolicitacaoBrincos = new SolicitacaoBrincos();
          solicitacaoBrinco.id = solicitacao['codigo'];
          solicitacaoBrinco.idFazenda = solicitacao['codigoFazenda'];
          solicitacaoBrinco.sisbovInicial = solicitacao['sisbovInicial'];
          solicitacaoBrinco.sisbovFinal = solicitacao['sisbovFinal'];
          solicitacaoBrinco.idFornecedor = solicitacao['codigoFornecedor'];
          solicitacaoBrinco.status = solicitacao['status'];
          solicitacaoBrinco.serie = solicitacao['serie'];
          solicitacaoBrinco.lojaFornecedor = solicitacao['lojafornecedor'];
          solicitacaoBrinco.quantidadeSisbov = solicitacao['quantidadeSisbov'];
          solicitacaoBrinco.nota = solicitacao['nota'];
          solicitacaoBrinco.dataSolicitacao = solicitacao['dataSolicitacao'];
          solicitacaoBrinco.dataValidate = solicitacao['dataValidade'];
          solicitacaoBrinco.dataAtualizacaoProtheus = solicitacao['dataAtualizacao'];
          arrPromises.push(this.saveSolicitacaoLocal(solicitacaoBrinco).toPromise());
        }
        Promise
          .all(arrPromises)
          .then(result => {
            console.log(result);
            resolve()
          })
          .catch(err => {
            console.log(err);
            reject()
          })
      } else {
        resolve();
      }
    })
  }

  /**
   * @description Busca as solicitações do servidor protheus
   * @param idFazenda
   */
  getSolicitacoesProtheus(): Observable<any> {
    return new Observable(subscriber => {
      this.contextoService.getFazenda()
        .then(idFazenda => {
          this.http.get(`${this.serverService.protheusAddress}/pecSolBrincos?codFazenda=${idFazenda}`)
            .subscribe(result => {
              subscriber.next(result);
              subscriber.complete();
            }, error1 => {
              subscriber.error(error1);
              subscriber.complete();
            })
        })
        .catch(error1 => {
          subscriber.error(error1);
          subscriber.complete();
        })
    })
  }

  /**
   * @description salva os locais
   */
  saveSolicitacaoLocal(solicitacao: SolicitacaoBrincos): Observable<any> {
    return this.http.post(`${this.serverService.sqlite}/solicitacaoBrinco`, {
      solicitacaoBrinco: {
        idSolicitacao: solicitacao.id,
        idFazenda: solicitacao.idFazenda,
        idFornecedor: solicitacao.idFornecedor,
        sisbovInicial: solicitacao.sisbovInicial,
        sisbovFinal: solicitacao.sisbovFinal,
        status: solicitacao.status,
        quantidadeSisbov: solicitacao.quantidadeSisbov,
        nota: solicitacao.nota,
        serie: solicitacao.serie,
        loja: solicitacao.lojaFornecedor,
        dataSolicitacao: solicitacao.dataSolicitacao,
        dataValidade: solicitacao.dataValidate,
        dataAtualizacao: solicitacao.dataAtualizacaoProtheus,
        deletado: solicitacao.deletado
      }
    })
  }

  /**
   * @description busca as solicitações na base local
   */
  getSolicitacaoLocal(idFazenda) {
    return new Observable(subscriber => {
      this.contextoService.getFazenda()
        .then(idFazenda => {
          this.http.get(`${this.serverService.sqlite}/solicitacaoBrinco?idFazenda=${idFazenda}`)
            .subscribe(result => {
              subscriber.next(result);
              subscriber.complete();
            }, error1 => {
              subscriber.error(error1);
              subscriber.complete();
            })
        })
        .catch(error1 => {
          subscriber.error(error1);
          subscriber.complete();
        })
    })
  }

  validaSolicitacaoBrinco(sisbov: string) {
    return new Observable(subscriber => {
      this.contextoService.getFazenda()
        .then(idFazenda => {
          this.http.get(`${this.serverService.sqlite}/solicitacaoBrinco/validaSisbov/${sisbov}?idFazenda=${idFazenda}`)
            .subscribe(result => {
              subscriber.next(result);
              subscriber.complete();
            }, error1 => {
              subscriber.error(error1);
              subscriber.complete();
            })
        })
        .catch(error1 => {
          subscriber.error(error1);
          subscriber.complete();
        })
    })
  }
}
