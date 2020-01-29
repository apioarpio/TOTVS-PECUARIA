import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexManejoComponent} from "./index-manejo/index-manejo.component";
import {ManejoSaidaComponent} from "./manejo-saida/manejo-saida.component";
import {ManejoMovimentacaoInternaComponent} from "./manejo-movimentacao-interna/manejo-movimentacao-interna.component";
import {ManejoHomeComponent} from "./manejo-home/manejo-home.component";
import {MovimentoEntradaCadastroComponent} from "./movimento-entrada/movimento-entrada-cadastro/movimento-entrada-cadastro.component";
import {MovimentoEntradaListComponent} from "./movimento-entrada/movimento-entrada-list/movimento-entrada-list.component";
import {ManejoTroncoPrincipalComponent} from "./manejo-tronco/manejo-tronco-principal/manejo-tronco-principal.component";

const manejoRoutes: Routes = [
  {
    path: '',
    component: IndexManejoComponent,
    children: [
      {path: 'manejoHome', component: ManejoHomeComponent},
      {path: 'manejoEntradaCadastro', component: MovimentoEntradaCadastroComponent},
      {path: 'manejoEntradaList', component: MovimentoEntradaListComponent},
      {path: 'manejoSaida', component: ManejoSaidaComponent},
      {path: 'manejoMovimentacaoInterna', component: ManejoMovimentacaoInternaComponent},
      {path: 'tronco/:idMovimentacao', component: ManejoTroncoPrincipalComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(manejoRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class OperacoesCurralRoutesModule {

}
