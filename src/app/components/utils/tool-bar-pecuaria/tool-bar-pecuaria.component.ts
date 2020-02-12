import {Component, OnInit, ViewChild} from '@angular/core';
import {PoModalAction, PoModalComponent, PoToolbarAction} from "@portinari/portinari-ui";
import {SelecaoContextoComponent} from "../../contexto/selecao-contexto/selecao-contexto.component";

@Component({
  selector: 'app-tool-bar-pecuaria',
  templateUrl: './tool-bar-pecuaria.component.html',
  styleUrls: ['./tool-bar-pecuaria.component.scss']
})
export class ToolBarPecuariaComponent implements OnInit {

  @ViewChild(PoModalComponent, {static: true}) poModal: PoModalComponent;
  @ViewChild('modalSync', {static: true}) poModalSync: PoModalComponent;
  @ViewChild('contexto', {static: true}) poModalContexto: SelecaoContextoComponent;
  @ViewChild('configServer', {static: true}) poModalConfigServer: PoModalComponent;


  bluetoothActions: Array<PoToolbarAction> = [
    // {icon: 'po-icon-bluetooth', label: 'bluetooth', action: item => this.onClickBluetooth(item)},
    {icon: 'po-icon-bluetooth', label: 'Sincronização', action: item => this.openModalSync(item)},
    {icon: 'po-icon-bluetooth', label: 'Contexto', action: item => this.openModalContexto(item)},
    {icon: 'po-icon-bluetooth', label: 'Servidor', action: item => this.openModalConfigServer(item)}
  ];

  close: PoModalAction = {
    action: () => {
      // this.closeModal();
    },
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      // this.proccessOrder();
    },
    label: 'Confirm'
  };

  constructor() {
  }

  ngOnInit() {
  }

  onClickBluetooth(item) {
    console.log(item);
    console.log(this.poModal);
    this.poModal.open();
  }

  openModalSync(item) {
    console.log(item);
    this.poModalSync.open();
  }

  openModalContexto(item) {
    this.poModalContexto.openModal()
  }

  openModalConfigServer(item) {
    this.poModalConfigServer.open()

  }
}
