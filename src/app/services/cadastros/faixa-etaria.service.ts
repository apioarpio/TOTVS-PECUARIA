import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaixaEtariaService {

  constructor(
    private serverService: ServerService,
    private http: HttpClient
  ) {
  }

  syncFaixaEtariaProtheuLocal() {
    return new Promise(async (resolve, reject) => {
      try {
        const faixasEtariaProtheus = await this.getFaixaEtariaProtheus().toPromise();
        const arrPromises = [];
        // @ts-ignore
        for (let fe of faixasEtariaProtheus) {
          console.log(fe);
          arrPromises.push(this.createFaixaEtariaLocal(fe).toPromise())
        }

        Promise.all(arrPromises)
          .then(result => {
            console.log(result);
            resolve(result);
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      } catch (e) {
        console.log(e);
        reject(e);
      }
    })
  }

  getFaixaEtariaProtheus(): Observable<any> {

    return this.http.get(`${this.serverService.serverAddress}/rest/faixaEtaria`)

  }

  getFaixaEtariaLocal() {

    //TODO implementar a estrutura de filtros para query params
    let query = '';

    return this.http.get(`${this.serverService.sqlite}/faixaEtaria`)

  }

  getFaixaEtariaByIdLocal(id) {

    //TODO implementar a estrutura de filtros para query params
    let query = '';

    return this.http.get(`${this.serverService.sqlite}/faixaEtaria/${id}`)

  }

  createFaixaEtariaLocal(faixaEtaria) {
    console.log(faixaEtaria);

    return this.http.post(`${this.serverService.sqlite}/faixaEtaria`, {
      faixaEtaria: {
        id: faixaEtaria['codigo'],
        descricao: faixaEtaria['nome'],
        inicio: faixaEtaria['fxInic'],
        fim: faixaEtaria['fxFim'],
        deletado: ''
      }
    });

  }

}
