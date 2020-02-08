import {NgModule} from "@angular/core";
import {IndexManejoComponent} from "./index-manejo/index-manejo.component";
import {OperacoesCurralRoutesModule} from "./operacoes-curral-routes.module";
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
import {OperacoesCurralCadastroComponent} from "./operacoes-curral-cadastro/operacoes-curral-cadastro.component";
import {MovimentoEntradaListComponent} from "./movimento-entrada/movimento-entrada-list/movimento-entrada-list.component";
import {PecModalFormAnimalComponent} from "./components/pec-modal-form-animal/pec-modal-form-animal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ManejoTroncoPrincipalComponent} from "./operacoes-tronco/tronco/manejo-tronco-principal.component";
import {CommonModule} from "@angular/common";
import {ModalFiltrosTroncoComponent} from "./components/modal-filtros-tronco/modal-filtros-tronco.component";
import {PecDirectivesModule} from "../../directives/directives.module";
import {InformacoesAnimalTroncoComponent} from "./operacoes-tronco/components/informacoes-animal-tronco/informacoes-animal-tronco.component";
import {InformacoesTroncoComponent} from "./operacoes-tronco/components/informacoes-tronco/informacoes-tronco.component";
import {PoStorageModule} from "@portinari/portinari-storage";
import {AparteDestinoComponent} from "./components/aparte-destino/aparte-destino.component";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    IndexManejoComponent,
    OperacoesCurralCadastroComponent,
    MovimentoEntradaListComponent,
    ManejoHomeComponent,
    ManejoSaidaComponent,
    ManejoMovimentacaoInternaComponent,
    ManejoTroncoPrincipalComponent,
    PecModalFormAnimalComponent,
    ModalFiltrosTroncoComponent,
    InformacoesAnimalTroncoComponent,
    InformacoesTroncoComponent,
    AparteDestinoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PecDirectivesModule,

    //router module
    OperacoesCurralRoutesModule,

    //portinari
    PoButtonGroupModule,
    PoButtonModule,
    PoChartModule,
    PoContainerModule,
    PoGridModule,
    PoFieldModule,
    PoTableModule,
    PoStorageModule.forRoot({
      name: 'pecStorage',
      storeName: '_pecStorage',
      driverOrder: ['lokijs']
    }),
    PoModule,
    ComponentsModule
  ]
})

export class OperacoesCurralModule {
}
