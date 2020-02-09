import {Component, OnInit} from '@angular/core';
import {ServerService} from "../../../services/utils/server.service";

@Component({
  selector: 'pec-configuracao-servidor',
  templateUrl: './configuracao-servidor.component.html',
  styleUrls: ['./configuracao-servidor.component.scss']
})
export class ConfiguracaoServidorComponent implements OnInit {

  protheusServer: string = '';

  constructor(
    private serverService: ServerService
  ) {
    serverService.getProtheusServerAddress()
      .then(result => {
        console.log(result);
        this.protheusServer = result
      })
  }

  ngOnInit() {
  }

  saveProtheusServer() {
    this.serverService.setProtheusServerAddress(this.protheusServer)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
