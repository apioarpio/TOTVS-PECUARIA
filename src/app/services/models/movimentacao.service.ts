import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movimentacao} from "../../model/movimentacao";
import {Observable} from "rxjs";
import {Animal} from "../../model/animal";

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
        idTm: movimentacao.tipoMovimento.idTm,
        idFazendaAtua: movimentacao.idFazenda,
        idFornecedor: movimentacao.idFornecedor,
        quantidadeAnimal: movimentacao.quantidadeAnimal,
        tipo: movimentacao.tipo,
        observacao: movimentacao.observacao,
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
    // return this.http.get(`${this.serverService.sqlite}/operacoes-curral?tipo=${tipoMovimentacao}&fields=${fields}`)
    return this.http.get(`${this.serverService.sqlite}/movimentacao?tipoMovimentacao=${tipoMovimentacao}`)
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

  addAnimalMovimentacao(animal: Animal, movimentacao: Movimentacao, area, lote): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Portinari-No-Error': 'true'
      })
    };
    return this.http.post(`${this.serverService.sqlite}/movimentacaoAnimal`, {
      movimentacaoAnimal: {
        movimentacao: {
          idMovimentacao: movimentacao.id,
          tipoMovimentacao: movimentacao.tipo,
          aparte: animal.aparte
        },
        animal: {
          idAnimal: animal.id,
          sisbov: animal.sisbov,
          dataNascimento: animal.dataNascimento,
          raca: animal.raca,
          sexo: animal.sexo,
          peso: animal.peso,
          area: animal.area,
          lote: animal.lote
        },
        areaAtual: area ? area : null,
        loteAtual: lote ? lote : null,
        integrado: false
      }
    }, httpOptions);
  }

  getAnimaisMovimentacao(idMovimentacao) {
    return this.http.get(`${this.serverService.sqlite}/movimentacaoAnimal/${idMovimentacao}`);
  }

}
