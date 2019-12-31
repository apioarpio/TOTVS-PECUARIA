import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PoModalAction, PoModalComponent} from "@portinari/portinari-ui";
import {SyncService} from "../../../services/utils/sync.service";

@Component({
  selector: 'app-tool-bar-sync',
  templateUrl: './tool-bar-sync.component.html',
  styleUrls: ['./tool-bar-sync.component.scss']
})
export class ToolBarSyncComponent implements OnInit {

  @ViewChild(PoModalComponent, {static: true}) poModal: PoModalComponent;

  currentState = 'initial';
  classSyncIcon = 'po-icon po-icon-refresh pecuaria-rotate-sync';
  onSync: boolean = false;
  pecSyncMorePopupActions = [
    {
      label: 'Sincronismo',
      action: this.openSyncModal()
    }
  ];

  constructor(
    syncService: SyncService
  ) {

    syncService.isSync.subscribe(result => {
      console.log('evento emitido')
      this.onSync = result === true;
    })

  }

  ngOnInit() {
  }

  openSyncModal() {
    // this.poModal.open()
    console.log(this.poModal)
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

}
