import {Injectable} from '@angular/core';
import {PoStorageService} from "@portinari/portinari-storage";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  serverAddress: string = '';//casa
  protheusAddress: string = '';//casa
  sqlite: string = 'http://localhost:3000';

  constructor(
    private poStorageService: PoStorageService
  ) {

    this.getLocalServerAddress()
      .then(serverAddress => {
        console.log(serverAddress)
        this.sqlite = serverAddress;
      })
      .catch(err => {
        console.log('erro ao obter o endereço do servidor local')
      });

    this.getProtheusServerAddress()
      .then(protheusAddres => {
        console.log(protheusAddres)
        this.protheusAddress = protheusAddres;
      })
      .catch(err => {
        console.log('erro ao obter o endereço do servidor Protheus')
      });

  }

  setProtheusServerAddress(serverAddress: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.poStorageService.set('protheusServerAddress', `${serverAddress}`)
        .then(() => {
          this.protheusAddress = serverAddress;
          resolve(true);
        })
        .catch(err => {
          console.log(err);
          reject(false);
        })
    })
  }

  getProtheusServerAddress(): Promise<string> {
    return this.poStorageService.get(`protheusServerAddress`);
  }

  getLocalServerAddress(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(this.sqlite)
    })
  }

}
