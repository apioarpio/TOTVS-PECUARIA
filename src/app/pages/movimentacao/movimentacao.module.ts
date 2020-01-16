import {NgModule} from "@angular/core";
import {IndexManejoComponent} from "./index-manejo/index-manejo.component";
import {MovimentacaoRoutesModule} from "./movimentacao-routes.module";
import {
  PoButtonGroupModule,
  PoButtonModule,
  PoChartModule,
  PoContainerModule, PoFieldModule,
  PoGridModule, PoModule, PoTableModule
} from "@portinari/portinari-ui";
import {ManejoHomeComponent} from "./manejo-home/manejo-home.component";
import {ManejoSaidaComponent} from "./manejo-saida/manejo-saida.component";
import {ManejoMovimentacaoInternaComponent} from "./manejo-movimentacao-interna/manejo-movimentacao-interna.component";
import {MovimentoEntradaCadastroComponent} from "./movimento-entrada/movimento-entrada-cadastro/movimento-entrada-cadastro.component";
import {MovimentoEntradaListComponent} from "./movimento-entrada/movimento-entrada-list/movimento-entrada-list.component";
import {PecModalFormAnimalComponent} from "./components/pec-modal-form-animal/pec-modal-form-animal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ManejoTroncoPrincipalComponent} from "./manejo-tronco/manejo-tronco-principal/manejo-tronco-principal.component";
import {CommonModule} from "@angular/common";
import {ModalFiltrosTroncoComponent} from "./components/modal-filtros-tronco/modal-filtros-tronco.component";
import {AppModule} from "../../app.module";
import {PecDirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    IndexManejoComponent,
    MovimentoEntradaCadastroComponent,
    MovimentoEntradaListComponent,
    ManejoHomeComponent,
    ManejoSaidaComponent,
    ManejoMovimentacaoInternaComponent,
    ManejoTroncoPrincipalComponent,
    PecModalFormAnimalComponent,
    ModalFiltrosTroncoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PecDirectivesModule,

    //router module
    MovimentacaoRoutesModule,

    //portinari
    PoButtonGroupModule,
    PoButtonModule,
    PoChartModule,
    PoContainerModule,
    PoGridModule,
    PoFieldModule,
    PoTableModule,
    PoModule
  ]
})

export class MovimentacaoModule {
}
