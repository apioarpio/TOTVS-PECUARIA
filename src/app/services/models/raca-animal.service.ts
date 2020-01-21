import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {RacaAnimal} from "../../model/raca-animal";
import {Observable} from "rxjs";
import {RacaAnimalProtheus} from "../../interfaces/raca-animal-protheus";

@Injectable({
  providedIn: 'root'
})
export class RacaAnimalService {

  constructor(
    private serverService: ServerService,
    private http: HttpClient
  ) {
  }

  syncRacaAnimaisProtheus() {
    return new Promise((resolve, reject) => {
      this.getProtheusRacasAnimal().subscribe(result => {
        let racasAnimaisProtheus: RacaAnimalProtheus[] = result;
        let promiseArr: Array<Promise<any>> = [];
        for (let raca of racasAnimaisProtheus) {
          let racaAnimal = new RacaAnimal()
            .createRacaAnimal(raca.codigo, raca.nome, raca.tipo, raca.intCer, raca.status, raca.dtAtua, raca.delet)
          console.log('incluindo a raca', racaAnimal);
          promiseArr.push(this.saveRacaAnimal(racaAnimal).toPromise());
        }
        Promise.all(promiseArr).then(result => {
          resolve()
        }).catch(err => {
          console.log(err);
          reject()
        })

      })
    })
  }

  getProtheusRacasAnimal(): Observable<any> {
    return this.http.get(`${this.serverService.serverAddress}/rest/racaAnimal`)

  }

  saveRacaAnimal(racaAnimal: RacaAnimal) {
    return this.http.post(`${this.serverService.sqlite}/racaAnimal`, {"racaAnimal": racaAnimal.getRacaAnimalObject()})
  }

  getRacaAnimalLocal() {
    return this.http.get(`${this.serverService.sqlite}/racaAnimal`);
  }

  getRacaAnimalLocalById(idRaca) {
    return this.http.get(`${this.serverService.sqlite}/racaAnimal/${idRaca}`);
  }

}
