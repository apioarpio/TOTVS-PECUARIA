import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  serverAddress: string = 'http://192.168.22.63:8885/rest';//totvs
  protheusAddress: string = 'http://192.168.22.63:8885/rest';//totvs
  // serverAddress: string = 'http://192.168.0.42:8885/rest';//bf
  // serverAddress: string = 'http://192.168.0.40:8885/rest';//casa
  sqlite: string = 'http://localhost:3000';

  constructor() {
  }
}
