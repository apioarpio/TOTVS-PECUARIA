import {Component, OnInit} from '@angular/core';
import {PoSelectOption} from "@portinari/portinari-ui";
import {ContextoService} from "../../../services/contexto.service";
import {EntidadeService} from "../../../services/models/entidade.service";

@Component({
  selector: 'pec-selecao-fazenda',
  templateUrl: './selecao-fazenda.component.html',
  styleUrls: ['./selecao-fazenda.component.scss']
})
export class SelecaoFazendaComponent implements OnInit {

  fazendaSelecionada: number = null;
  readonly fazendas: Array<PoSelectOption> = [];

  constructor(
    private contextoService: ContextoService,
    private entidadeService: EntidadeService
  ) {
  }

  ngOnInit() {
  }

  onSelectFazenda(evento): void {
    this.contextoService.setFazendaContexto(this.fazendaSelecionada)
      .subscribe(result => {
        console.log(result)
      }, err => {
        console.log(err)
      })
  }

  updateEntidades(): void {
    this.entidadeService.getEntidadesByTipo(1)
      .subscribe(result => {
        let items = result['items'];
        if (items) {
          for (let fazenda of items) {
            this.fazendas.push({value: fazenda.idEntidade, label: fazenda.nome})
          }
        }
      })
  }

  setEntidadeAtual() {
    return new Promise((resolve, reject) => {
      this.contextoService.getFazenda()
        .then(result => {
          this.fazendaSelecionada = result;
          console.log(result);
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    });
  }

}
