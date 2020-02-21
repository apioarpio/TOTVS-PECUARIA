import {Injectable} from '@angular/core';
import {ServerService} from '../utils/server.service';
import {HttpClient} from '@angular/common/http';
import {Animal} from '../../model/animal';
import {IntegracaoLogService} from '../utils/integracao-log.service';
import {Movimentacao} from '../../model/movimentacao';
import {Observable} from 'rxjs';

import * as moment from 'moment';
import {HistoricoPeso} from '../../model/historico-peso';
import {ContextoService} from '../contexto.service';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private serverService: ServerService,
    private integracaoLogService: IntegracaoLogService,
    private contextoService: ContextoService,
    private http: HttpClient
  ) {
  }

  syncAnimais(): Promise<any> {
    // TODO criar uma variavel fora do try para abrigar todas as promises de inclusão, para que
    // caso haja uma excessão no meio da execução de busca dos animais, os animais que estão sendo incluidos
    // sejam exibidos como concluidos para os usuários
    return new Promise(async (resolve, reject) => {

      let contSync = true; // informa se a sincronização deve continuar
      const promiseArr: Promise<any>[] = []; // array de promises de inclusão
      try {
        const idFazenda: number = await this.contextoService.getFazenda();
        console.log(idFazenda);
        while (contSync) {
          // busca os animais no servidor
          const animaisServer = await this.getAnimaisServer(idFazenda, '', 1000);
          console.log(animaisServer);
          if (animaisServer['animais']) {
            const animaisInclusao: Animal[] = [];
            for (let animalServer of animaisServer['animais']) {
              let animal: Animal = new Animal();
              animal.createAnimal(
                animalServer['SISBOV'], animalServer['MANEJO'], animalServer['RACA'], animalServer['SEXO'],
                animalServer['DTNASC'], animalServer['DTSBOV'], animalServer['FXEERA'], animalServer['PESO'],
                animalServer['DTPSGE'] ? moment(animalServer['DTPSGE'], 'YYYYMMDD').format('DD/MM/YYYY') : '',
                animalServer['CODFAZ'], animalServer['CODFOR'], animalServer['NUMSOL'], animalServer['DTENTR'], animalServer['MOVORI'],
                animalServer['CDRFID'], animalServer['LOTE'], animalServer['pasto'], animalServer['dtLbab'], animalServer['DTABAT'],
                animalServer['DLBAB2'], animalServer['dtMort'], animalServer['ctrlws'], animalServer['STATUS'],
                animalServer['DTCTHT'], animalServer['cstrdo'], animalServer['dtAtua'], animalServer['fazOri'], animalServer['CERTIF'],
                animalServer['DTCERT'], animalServer['transf']);
              animaisInclusao.push(animal);
            }
            contSync = false;
            promiseArr.push(this.saveAnimaisLocal(animaisInclusao).toPromise());
            if (animaisServer['registrosRem'] === 0) {
              contSync = false;
            }
            Promise.all(promiseArr)
              .finally( () => {
                resolve();
              });
          }
        }

        await this.integracaoLogService.saveSync('animal.ts', 1000).toPromise();

      } catch (e) {
        console.log(e);
        reject(e);
      }
    });

  }

  getAnimaisLocal(): Observable<any> {
    return this.http.get(`${this.serverService.sqlite}/animal`);
  }

  getAnimalBySisbov(sisbov: number): Promise<Animal> {
    return new Promise<Animal>((resolve, reject) => {
      this.http.get(`${this.serverService.sqlite}/animal/${sisbov}`)
        .subscribe(animal => {
          let animalReturn = new Animal();
          animalReturn.id = animal['idAnimal'];
          animalReturn.sisbov = animal['sisbov'];
          animalReturn.manejo = animal['manejo'];
          animalReturn.raca = animal['raca'];
          animalReturn.nomeRaca = animal['nomeRaca'];
          animalReturn.sexo = animal['sexo'];
          animalReturn.dataNascimento = animal['dataNascimento'];
          animalReturn.dataIncSisbov = animal['dataIncSisbov'];
          animalReturn.codFAixaEtaria = animal['codFAixaEtaria'];
          animalReturn.dataPesagem = animal['dataPesagem'];
          animalReturn.codFazenda = animal['codFazenda'];
          animalReturn.codFornecedor = animal['codFornecedor'];
          animalReturn.numeroSolSisbov = animal['numeroSolSisbov'];
          animalReturn.dataEntrada = animal['dataEntrada'];
          animalReturn.movimentoOrigem = animal['movimentoOrigem'];
          animalReturn.rfid = animal['rfid'];
          animalReturn.lote = animal['lote'];
          animalReturn.area = animal['pasto'];
          animalReturn.dataLibAbateCertificadora = animal['dataLibAbateCertificadora'];
          animalReturn.dataAbate = animal['dataAbate'];
          animalReturn.dataLibAbateSanitario = animal['dataLibAbateSanitario'];
          animalReturn.dataApontamentoMorte = animal['dataApontamentoMorte'];
          animalReturn.controleWebservice = animal['controleWebservice'];
          animalReturn.status = animal['status'];
          animalReturn.dataLimiteCotaHilton = animal['dataLimiteCotaHilton'];
          animalReturn.cadastro = animal['cadastro'];
          animalReturn.dataAtualizacaoAnimal = animal['dataAtualizacaoAnimal'];
          animalReturn.fazendaOrigem = animal['fazendaOrigem'];
          animalReturn.certificadora = animal['certificadora'];
          animalReturn.dataCertificadora = animal['dataCertificadora'];
          animalReturn.controleTransferencia = animal['controleTransferencia'];

          if (animal['historicoPeso']) {
            let historicoPeso = new HistoricoPeso();
            historicoPeso.dataPesagem = animal['historicoPeso'].dataPesagem;
            historicoPeso.peso = animal['historicoPeso'].peso;
            animalReturn.historicoPeso = historicoPeso;
          }
          resolve(animalReturn);
        }, err => err ? reject(err) : null);
    });
  }

  getIndicadoresAnimais(): Observable<any> {
    return this.http.get(`${this.serverService.sqlite}/animal/indicadores`);
  }

  private getAnimaisServer(codFaz, recno, maxRecords): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryStringArr = [];
      let queryString = codFaz || recno || maxRecords ? '?' : '';
      let protheusServer = await this.serverService.getProtheusServerAddress();
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

      let result = await this.http.get(`${protheusServer}/pecAnimal${queryString}`).toPromise();
      resolve(result);
    });
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

  private createHistoricoPeso(animal: Animal, movimentacao: Movimentacao, integrado: boolean): Observable<any> {

    return this.http.post(`${this.serverService.sqlite}/historicoPeso`, {
      sisbov: animal.sisbov,
      idMovimentacao: movimentacao.id,
      tipoMovimentacao: movimentacao.tipo,
      peso: animal.peso,
      integrado: integrado
    });

  }

}
