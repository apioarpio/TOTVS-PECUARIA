import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexManejoComponent} from "./index-manejo/index-manejo.component";
import {ManejoSaidaComponent} from "./manejo-saida/manejo-saida.component";
import {ManejoMovimentacaoInternaComponent} from "./manejo-movimentacao-interna/manejo-movimentacao-interna.component";
import {OperacoesCurralHomeComponent} from "./operacoes-curral-home/operacoes-curral-home.component";
import {OperacoesCurralCadastroComponent} from "./operacoes-curral-cadastro/operacoes-curral-cadastro.component";
import {MovimentoEntradaListComponent} from "./movimento-entrada/movimento-entrada-list/movimento-entrada-list.component";
import {ManejoTroncoPrincipalComponent} from "./operacoes-tronco/tronco/manejo-tronco-principal.component";

const manejoRoutes: Routes = [
  {
    path: '',
    component: IndexManejoComponent,
    children: [
      {path: 'manejoHome', component: OperacoesCurralHomeComponent},
      {path: 'operacaoCadastro/:tipoMovimentacao', component: OperacoesCurralCadastroComponent},
      {path: 'manejoEntradaList', component: MovimentoEntradaListComponent},
      {path: 'manejoSaida', component: ManejoSaidaComponent},
      {path: 'manejoMovimentacaoInterna', component: ManejoMovimentacaoInternaComponent},
      {path: 'tronco/:idMovimentacao', component: ManejoTroncoPrincipalComponent},
      {path: 'animal', loadChildren: '../animal/animal.module#AnimalModule'}
    ]
  },
  {
    path: '/home',
    loadChildren: '../home/home.module#HomeModule'
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
