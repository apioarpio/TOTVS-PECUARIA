import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerService} from "./utils/server.service";
import {Entidade} from "../model/entidade";

@Injectable({
  providedIn: 'root'
})
export class ContextoService {

  sqliteServer: string = '';
  protheusServer: string = '';
  fazendaAtual: Entidade = new Entidade();

  trocaFazendaAtual: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private serverService: ServerService
  ) {
    this.setServerAdress()
  }

  private getContextoInfo() {
    return this.http.get(`${this.sqliteServer}/contexto`)
  }

  /**
   * @description busca a fazenda selecionada.
   */
  getFazenda(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const contexto = await this.getContextoInfo().toPromise();// busca as informações de contexto
        resolve(contexto['codFazendaAtual']); // separa a fazenda atual para em uma constante
      } catch (e) {
        console.log(e);
        reject(null)
      }
    });
  }

  getEstacaoAtual(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const contexto = await this.getContextoInfo().toPromise();// busca as informações de contexto
        resolve(contexto['codEstacao']); // separa a fazenda atual para em uma constante
      } catch (e) {
        console.log(e);
        reject(null)
      }
    });
  }
  /**
   * @description define a fazenda que será utilizada.
   * @param idFazenda
   */
  setFazendaContexto(idFazenda) {
    return this.http.post(`${this.sqliteServer}/contexto/setFazendaAtual`, {codFazenda: idFazenda})
  }

  private setServerAdress(): void {
    this.serverService
      .getProtheusServerAddress()
      .then(result => {
        this.protheusServer = result;
      })
      .catch(err => {
        console.log('não foi possível obter o endereço do servidor Protheus');
        console.log(err);
      });

    this.serverService
      .getLocalServerAddress()
      .then(result => {
        this.sqliteServer = result;
      })
      .catch(err => {
        console.log('não foi possível obter o endereço do servidor Local');
        console.log(err);
      })
  }


}
