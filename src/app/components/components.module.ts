import {NgModule} from "@angular/core";
import {SideMenuPecuariaComponent} from "./utils/side-menu-pecuaria/side-menu-pecuaria.component";
import {ToolBarPecuariaComponent} from "./utils/tool-bar-pecuaria/tool-bar-pecuaria.component";
import {ToolBarSyncComponent} from "./utils/tool-bar-sync/tool-bar-sync.component";
import {BluetoothComponent} from "./utils/bluetooth/bluetooth.component";
import {
  PoButtonModule,
  PoContainerModule, PoFieldModule,
  PoListViewModule,
  PoMenuModule,
  PoModalModule,
  PoToolbarModule
} from "@portinari/portinari-ui";
import {ModalSyncComponent} from "./modals/modal-sync/modal-sync.component";
import {CommonModule} from "@angular/common";
import {PecGridComponent} from './pec-grid/pec-grid.component';
import {AnimaisRacaDetailComponent} from './chats/animais-raca-detail/animais-raca-detail.component';
import {ChartsModule} from "ng2-charts";
import {ConfiguracaoServidorComponent} from "./contexto/configuracao-servidor/configuracao-servidor.component";
import {SelecaoContextoComponent} from "./contexto/selecao-contexto/selecao-contexto.component";
import {FormsModule} from "@angular/forms";
import { SelecaoFazendaComponent } from './contexto/selecao-fazenda/selecao-fazenda.component';

@NgModule({
  declarations: [
    SideMenuPecuariaComponent,
    ToolBarPecuariaComponent,
    ToolBarSyncComponent,
    BluetoothComponent,
    ModalSyncComponent,
    PecGridComponent,
    AnimaisRacaDetailComponent,
    ConfiguracaoServidorComponent,
    SelecaoContextoComponent,
    SelecaoFazendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    //Portinari Modules
    PoMenuModule,
    PoModalModule,
    PoToolbarModule,
    PoListViewModule,
    PoButtonModule,
    PoContainerModule,
    ChartsModule,
    //BluetoothModule
    PoFieldModule
  ],
  exports: [
    SideMenuPecuariaComponent,
    ToolBarPecuariaComponent,
    ToolBarSyncComponent,
    BluetoothComponent,
    ModalSyncComponent,
    AnimaisRacaDetailComponent,
    ConfiguracaoServidorComponent,
    SelecaoContextoComponent,
    SelecaoFazendaComponent
  ]
})

export class ComponentsModule {

}
