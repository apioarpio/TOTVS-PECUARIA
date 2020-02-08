import {Component, OnInit} from '@angular/core';
import {Entidade} from "../../../model/entidade";
import {IntegracaoLogService} from "../../../services/utils/integracao-log.service";
import {EntidadeService} from "../../../services/models/entidade.service";


@Component({
  selector: 'app-index-entidades',
  templateUrl: './index-entidades.component.html',
  styleUrls: ['./index-entidades.component.scss']
})
export class IndexEntidadesComponent implements OnInit {
  entidadesHeader = [{property: "CODIGO", label: 'Código'}, {property: "NOME", label: 'Nome Fazenda'}];
  entidades: Entidade[] = [];
  loading: boolean = false;
  filter = {
    nome: ''
  };

  constructor(
    private entidadeService: EntidadeService,
    private intLog: IntegracaoLogService
  ) {
    this.getAllEntidades();
  }

  ngOnInit() {
  }

  loadingTable() {
    this.loading = this.loading === true ? false : true;
  }

  get() {

    // this.intLog.lastDateSync('entidade').then( result => console.log(result));
    let arr = []
    console.log(new Date().toLocaleString());
    Promise.all(arr).then(() => console.log(new Date().toLocaleString()))

    // this.entidadeService.getEntidadeStorageById('1')
    //   .then( result => console.log('resultado', result))
    //   .catch( err => console.log('err', err));
  }

  set() {
    this.entidadeService.syncEntidades().then(result => console.log(result));
  }

  getAllEntidades() {
    this.entidadeService.getAllEntidades(null, 20).subscribe(result => {
      console.log(result)
      this.entidades = result.entidades.values;
    }, error1 => {
      console.log(error1);
    })
  }

  showMore(event) {
    console.log(event)
  }

}
