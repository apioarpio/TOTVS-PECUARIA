import {Injectable} from '@angular/core';
import {ServerService} from "../../../services/utils/server.service";
import {TiposMovimento} from "../../../model/tipos-movimento";
import {HttpClient} from "@angular/common/http";
import {IntegracaoLogService} from "../../../services/utils/integracao-log.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TiposMovimentoService {

  constructor(
    public serverService: ServerService,
    public integracaoLogService: IntegracaoLogService,
    public http: HttpClient
  ) {

  }

  syncTMs() {
    return new Promise((resolve, reject) => {
      this.getTMsServer().subscribe(tms => {
        console.log(tms);
        let arrSync = [];// Array das promises de save.
        let contadorSyncSuccess = 0;
        let contadorSyncError = 0;
        let contador = 0;
        // @ts-ignore
        for (let tm of tms) {
          let tipoMovimento: TiposMovimento = new TiposMovimento();
          tipoMovimento.idTm = tm["CODIGO"];
          tipoMovimento.descricao = tm["DESCRI"];
          tipoMovimento.tipo = tm["TIPO"];
          tipoMovimento.codigoCertificadora = tm["CDCERT"];
          tipoMovimento.status = tm["STATUS"];
          tipoMovimento.brincoEletronico = tm["BRELET"];
          tipoMovimento.incluiSisbov = tm["IDTFSB"];
          tipoMovimento.pesaAnimal = tm["PESANI"];
          tipoMovimento.sanitario = tm["TRASAN"];
          tipoMovimento.vinculaLote = tm["VCLOTE"];
          tipoMovimento.vinculaArea = tm["VCAREA"];
          tipoMovimento.tipoSaida = tm["TPSAID"];
          tipoMovimento.tipoEntrada = tm["TPENTR"];
          contador += 1;

          arrSync.push(
            this.saveTM(tipoMovimento).toPromise()
              .then(result => {
                contadorSyncSuccess += 1;
              })
              .catch(err => {
                contadorSyncError += 1;
              })
          );
        }
        //aguarda todos os tipos de movimentos serem salvos
        Promise.all(arrSync)
          .finally(() => {
            console.log(contadorSyncSuccess);
            console.log(contadorSyncError);
            console.log(contador);
            this.integracaoLogService.saveSync('tiposMovimento', contadorSyncSuccess).subscribe(result => {
              console.log('resultado save log', result);
            });
            resolve();
          })
      })
    })
  }

  private saveTM(tipoMovimento: TiposMovimento) {
    if (tipoMovimento) {
      console.log(tipoMovimento);
      let tipoMovimentoObj = {
        idTm: tipoMovimento.idTm,
        descricao: tipoMovimento.descricao,
        tipo: tipoMovimento.tipo,
        codigoCertificadora: tipoMovimento.codigoCertificadora,
        status: tipoMovimento.status,
        brincoEletronico: tipoMovimento.brincoEletronico,
        incluiSisbov: tipoMovimento.incluiSisbov,
        pesaAnimal: tipoMovimento.pesaAnimal,
        sanitario: tipoMovimento.sanitario,
        vinculaLote: tipoMovimento.vinculaLote,
        vinculaArea: tipoMovimento.vinculaArea,
        tipoSaida: tipoMovimento.tipoSaida,
        tipoEntrada: tipoMovimento.tipoEntrada
      };
      return this.http.post(`${this.serverService.sqlite}/tiposMovimento`, {TM: tipoMovimentoObj})
    }
  }

  getTMsLocal() {
    return this.http.get(`${this.serverService.sqlite}/tiposMovimento`);
  }

  getTMsLocalByTipo(tipoTm) {
    return this.http.get(`${this.serverService.sqlite}/tiposMovimento?tiposTm=${tipoTm}`);
  }

  getTMsServer() {
    return new Observable(subscriber => {
      this.serverService.getProtheusServerAddress()
        .then(protheusServer => {
          this.http.get(`${protheusServer}/pecTiposMovimento`)
            .subscribe(tms => {
                subscriber.next(tms);
                subscriber.complete();
              },
              err => {
                subscriber.error(err);
                subscriber.complete();
              }
            )
        })
        .catch(err => {
          subscriber.error(err);
          subscriber.complete();
        })
    })
  }

  getTMById(id) {
    return this.http.get(`${this.serverService.sqlite}/tiposMovimento/${id}`)
  }

}
