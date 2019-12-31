import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Animal} from "../../model/animal";
import {IntegracaoLogService} from "../utils/integracao-log.service";

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private serverService: ServerService,
    private integracaoLogService: IntegracaoLogService,
    private http: HttpClient
  ) {
  }

  async syncAnimais(): Promise<any> {
    //TODO criar uma variavel fora do try para abrigar todas as promises de inclusão, para que
    //caso haja uma excessão no meio da execução de busca dos animais, os animais que estão sendo incluidos
    //sejam exibidos como concluidos para os usuários

    let contSync = true; //informa se a sincronização deve continuar
    const promiseArr: Promise<any>[] = []; //array de promises de inclusão
    try {
      while (contSync) {
        //busca os animais no servidor
        const animaisServer = await this.getAnimaisServer('16', '01', '', 1000).toPromise();
        console.log(animaisServer);
        if (animaisServer['animais']) {
          const animaisInclusao: Animal[] = [];
          for (let animalServer of animaisServer['animais']) {
            let animal: Animal = new Animal();
            animal.createAnimal(
              animalServer['SISBOV'], animalServer['MANEJO'], animalServer['RACA'], animalServer['SEXO'],
              animalServer['DTNASC'], animalServer['DTSBOV'], animalServer['FXEERA'], animalServer['PESO'], animalServer['DTPSGE'],
              animalServer['CODFAZ'], animalServer['CODFOR'], animalServer['NUMSOL'], animalServer['DTENTR'], animalServer['MOVORI'],
              animalServer['CDRFID'], animalServer['LOTE'], animalServer['pasto'], animalServer['dtLbab'], animalServer['DTABAT'],
              animalServer['DLBAB2'], animalServer['dtMort'], animalServer['ctrlws'], animalServer['STATUS'],
              animalServer['DTCTHT'], animalServer['cstrdo'], animalServer['dtAtua'], animalServer['fazOri'], animalServer['CERTIF'],
              animalServer['DTCERT'], animalServer['transf']);
            animaisInclusao.push(animal);
          }
          contSync = false;
          promiseArr.push(this.saveAnimaisLocal(animaisInclusao).toPromise());
          if (animaisServer["registrosRem"] === 0) {
            contSync = false;
          }
        }
      }

      await this.integracaoLogService.saveSync('animal', 1000).toPromise();

    } catch (e) {
      console.log(e);
    }
  }

  private getAnimaisServer(empresa, codFaz, recno, maxRecords) {
    const queryStringArr = [];
    let queryString = empresa || codFaz || recno || maxRecords ? "?" : "";
    empresa ? queryStringArr.push(`empresa=${empresa}`) : null;
    codFaz ? queryStringArr.push(`codFaz=${codFaz}`) : null;
    recno ? queryStringArr.push(`recno=${recno}`) : null;
    maxRecords ? queryStringArr.push(`maxRecord=${maxRecords}`) : null;

    for (let i = 0; i < queryStringArr.length; i++) {
      if (i > 0) {
        queryString += `&${queryStringArr[i]}`;
      } else {
        queryString += queryStringArr[i];
      }
    }
    return this.http.get(`${this.serverService.serverAddress}/rest/animaispec${queryString}`)
  }

  getAnimalBySisbov(sisbov: number) {
    return this.http.get(`${this.serverService.sqlite}/animal/${sisbov}`)
  }

  private saveAnimaisLocal(animais: Animal[]) {
    let arrAnimais = [];
    for (let animal of animais) {
      if (animal.sisbov) {
        console.log(`adicionando o animal ${animal.sisbov} ao array`);
        arrAnimais.push(animal.getAnimalObject());
        
      }
    }
    return this.http.post(`${this.serverService.sqlite}/animal`, {animais: arrAnimais});
  }
}
