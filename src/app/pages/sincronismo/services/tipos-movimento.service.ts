import {Injectable} from '@angular/core';
import {ServerService} from "../../../services/utils/server.service";
import {TiposMovimento} from "../../../model/tipos-movimento";
import {HttpClient} from "@angular/common/http";
import {IntegracaoLogService} from "../../../services/utils/integracao-log.service";

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
          let tipoMovimento: TiposMovimento = new TiposMovimento(
            tm["CODIGO"],
            tm["DESCRI"],
            tm["TIPO"],
            tm["CDCERT"],
            tm["STATUS"],
            tm["BRELET"],
            tm["IDTFSB"],
            tm["PESANI"],
            tm["TRASAN"],
            tm["VCLOTE"],
            tm["VCAREA"],
            tm["TPSAID"],
            tm["TPENTR"]);
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

  saveTM(tipoMovimento: TiposMovimento) {
    if (tipoMovimento) {
      let tipoMovimentoObj = {
        codigo: tipoMovimento.codigo,
        descricao: tipoMovimento.descricao,
        tipo: tipoMovimento.tipo,
        cdCert: tipoMovimento.cdCert,
        status: tipoMovimento.status,
        brelet: tipoMovimento.brelet,
        idTfsb: tipoMovimento.idTfsb,
        pesani: tipoMovimento.pesani,
        trasan: tipoMovimento.trasan,
        vclote: tipoMovimento.vclote,
        vcarea: tipoMovimento.vcarea,
        tpsaid: tipoMovimento.tpsaid,
        tpentr: tipoMovimento.tpentr
      };
      return this.http.post(`${this.serverService.sqlite}/tiposMovimento`, {TM: tipoMovimentoObj})
    }
  }

  getTMsLocal() {
    return this.http.get(`${this.serverService.sqlite}/tiposMovimento`);
  }

  getTMsServer() {

    return this.http.get(`${this.serverService.serverAddress}/rest/TIPOSMOVIMENTO`)

  }

  getTMById() {

  }

}
