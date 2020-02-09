import {Component, OnInit, ViewChild} from '@angular/core';
import {ContextoService} from "../../../services/contexto.service";
import {PoModalComponent, PoSelectOption} from "@portinari/portinari-ui";
import {EntidadeService} from "../../../services/models/entidade.service";
import {SelecaoFazendaComponent} from "../selecao-fazenda/selecao-fazenda.component";

@Component({
  selector: 'pec-selecao-contexto',
  templateUrl: './selecao-contexto.component.html',
  styleUrls: ['./selecao-contexto.component.scss']
})
export class SelecaoContextoComponent implements OnInit {

  @ViewChild('modal', {static: true}) poModal: PoModalComponent;
  @ViewChild('selecaoFazenda', {static: true}) pecSelecaoFazenda: SelecaoFazendaComponent;

  constructor() {
  }

  ngOnInit() {
  }

  async openModal() {
    try {
      await this.pecSelecaoFazenda.updateEntidades();
      await this.pecSelecaoFazenda.setEntidadeAtual();
      await this.poModal.open();
    } catch (e) {
      console.log(e)
    }
  }

}
