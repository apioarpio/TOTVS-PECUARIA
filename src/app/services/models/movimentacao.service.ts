import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movimentacao} from "../../model/movimentacao";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  constructor(
    private http: HttpClient,
    private serverService: ServerService
  ) {
  }

  saveMovimentacao(movimentacao: Movimentacao) {
    return this.http.post(`${this.serverService.sqlite}/movimentacao`, {
      movimentacao: {
        idTm: movimentacao.idTm,
        quantidadeAnimal: movimentacao.quantidadeAnimal,
        tipo: movimentacao.tipo,
        observacao: movimentacao.observacao,
        idFornecedor: movimentacao.idFornecedor,
        numeroGta: movimentacao.numeroGta,
        serieGta: movimentacao.serieGta,
        dataEmissaoGta: movimentacao.dataEmissaoGta,
        dataValidadeGta: movimentacao.dataValidadeGta,
        dataSaidaGta: movimentacao.dataSaidaGta,
        dataChegadaGta: movimentacao.dataChegadaGta
      }
    })
  }

  getMovimentacoes(tipoMovimentacao, fields: string) {
    // return this.http.get(`${this.serverService.sqlite}/movimentacao?tipo=${tipoMovimentacao}&fields=${fields}`)
    return this.http.get(`${this.serverService.sqlite}/movimentacao`)
  }

  getMovimentacoesById(idMovimentacao: number, fields: string) {
    let queryParam = '';
    let fieldsFilters = '';
    if (fields) {
      fieldsFilters += `fields=${fields}`
    }
    if (fieldsFilters) {
      queryParam += `?${fieldsFilters}`
    }
    return this.http.get(`${this.serverService.sqlite}/movimentacao/${idMovimentacao}${queryParam}`)
  }

  addAnimalMovimentacao(idMovimentacao, idAnimal, aparte, peso): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Portinari-No-Error': 'true'
      })
    };
    return this.http.post(`${this.serverService.sqlite}/movimentacaoAnimal`, {
      idMovimentacao: idMovimentacao,
      idAnimal: idAnimal,
      aparte: aparte,
      peso: peso
    }, httpOptions);
  }

  getAnimaisMovimentacao(idMovimentacao) {
    return this.http.get(`${this.serverService.sqlite}/movimentacaoAnimal/${idMovimentacao}`);
  }

}
