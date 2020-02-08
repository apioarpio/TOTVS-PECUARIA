import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Area} from "../../model/area";
import {Observable} from "rxjs";
import {ContextoService} from "../contexto.service";

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private serverService: ServerService,
    private http: HttpClient,
    private contextoService: ContextoService
  ) {
  }

  syncAreasProtheus(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {

        const fazenda = await this.contextoService.getFazenda();
        const areasProtheus = await this.getAreasProtheus(fazenda);//busca as áreas cadastradas no ERP protheus
        let arrPromises = []; // cria um array de promises, esse array irá abrigar todas as promises de inclusão de área na base local.

        const registrosTotais: number = areasProtheus.length;
        let registrosSalvos: number = 0;
        let registrosComErro: number = 0;
        //para cada area retornada do protheus, cria uma requisição de inclusão na base local
        for (let area of areasProtheus) {
          arrPromises.push(
            this.saveAreaLocal(area).toPromise()
              .then(() => {
                registrosSalvos += 1;
              })
              .catch(() => {
                registrosComErro += 1;
              })
          )
        }
        //espera todas as inclusões serem processadas
        let resultAllPromises = await Promise.all(arrPromises);
        resolve(resultAllPromises)
      } catch (e) {
        reject(e)
      }
    })
  }

  saveAreaLocal(area: Area) {

    return this.http.post(`${this.serverService.sqlite}/area`, {
      area: {
        idArea: area.idArea,
        idFazenda: area.idFazenda,
        nome: area.nome,
        tamanhoHectares: area.tamanhoHectares,
        quantidadeAnimais: area.quantidadeAnimais,
        status: area.status,
        caracteristicas: area.caracteristicas,
        tipo: area.tipo,
        dataSincronizacao: area.dataAtualizacaoProtheus,
        deletado: area.deletado
      }
    })

  }

  getAreasProtheus(idFazenda): Promise<Array<Area>> {

    return new Promise((resolve, reject) => {

      const getProtheus = this.http.get(`${this.serverService.protheusAddress}/pecAreaAnimal?codFazenda=${idFazenda}`);

      getProtheus.subscribe(result => {
        if (Array.isArray(result)) {
          if (result.length) {
            let arrAreas: Array<Area> = [];
            for (let a of result) {
              let area = new Area();
              area.idArea = a['codigo'];
              area.idFazenda = a['codigoFazenda'];
              area.nome = a['nome'];
              area.caracteristicas = a['caracteristica'];
              area.status = a['status'];
              area.quantidadeAnimais = a['quantidadeAnimais'];
              area.tamanhoHectares = a['tamanhoHectare'];
              area.tipo = a['tipo'];
              area.deletado = !!a['deleted'];
              area.dataAtualizacaoProtheus = a['dataAtualizacao'];
              arrAreas.push(area)
            }
            resolve(arrAreas);
          } else {
            console.log('Nenhum Registro Encontrado!');
            reject()
          }
        } else {
          console.log('Nenhum Registro Encontrado!');
          reject()
        }
      })
    })
  }

  getAreaLocal(idFazenda): Observable<any> {
    return this.http.get(`${this.serverService.sqlite}/area?idFazenda=${idFazenda}`);
  }

  getAreaLocalById(idArea, idFazenda): Observable<any> {
    return this.http.get(`${this.serverService.sqlite}/area/${idArea}?idFazenda=${idFazenda}`)
  }

}
