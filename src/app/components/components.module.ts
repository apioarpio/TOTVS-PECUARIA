import {NgModule} from "@angular/core";
import {SideMenuPecuariaComponent} from "./utils/side-menu-pecuaria/side-menu-pecuaria.component";
import {ToolBarPecuariaComponent} from "./utils/tool-bar-pecuaria/tool-bar-pecuaria.component";
import {ToolBarSyncComponent} from "./utils/tool-bar-sync/tool-bar-sync.component";
import {BluetoothComponent} from "./utils/bluetooth/bluetooth.component";
import {WebBluetoothModule} from "@manekinekko/angular-web-bluetooth";
import {
  PoButtonModule,
  PoContainerModule,
  PoListViewModule,
  PoMenuModule,
  PoModalModule,
  PoToolbarModule
} from "@portinari/portinari-ui";
import {ModalSyncComponent} from "./modals/modal-sync/modal-sync.component";
import {CommonModule} from "@angular/common";
import { PecGridComponent } from './pec-grid/pec-grid.component';

@NgModule({
  declarations: [
    SideMenuPecuariaComponent,
    ToolBarPecuariaComponent,
    ToolBarSyncComponent,
    BluetoothComponent,
    ModalSyncComponent,
    PecGridComponent
  ],
  imports: [
    CommonModule,
    //Portinari Modules
    PoMenuModule,
    PoModalModule,
    PoToolbarModule,
    PoListViewModule,
    PoButtonModule,
    PoContainerModule,
    //BluetoothModule
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    })
  ],
  exports: [
    SideMenuPecuariaComponent,
    ToolBarPecuariaComponent,
    ToolBarSyncComponent,
    BluetoothComponent,
    ModalSyncComponent
  ]
})

export class ComponentsModule {

}
