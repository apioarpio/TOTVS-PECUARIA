import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {HttpClient} from "@angular/common/http";
import {Area} from "../../model/area";

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private serverService: ServerService,
    private http: HttpClient
  ) {
  }

  syncAreasProtheus(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAreasProtheus(1)
        .then(result => {
          let arrPromises = [];
          const registrosTotais: number = result.length;
          let registrosSalvos: number = 0;
          let registrosComErro: number = 0;

          for (let area of result) {
            arrPromises.push(
              this.saveAreaLocal(area).toPromise()
                .then(result => {
                  registrosSalvos += 1;
                })
                .catch(err => {
                  registrosComErro += 1;
                })
            )
          }
          Promise.all(arrPromises)
            .then(result => {
              console.log(registrosTotais);
              console.log(registrosSalvos);
              console.log(registrosComErro);

              resolve(result)
            })
            .catch(err => {
              console.log(err);
              reject(err)
            })
        })
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

}
