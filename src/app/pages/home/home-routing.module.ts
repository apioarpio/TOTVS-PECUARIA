import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./index/home.component";

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'entidade', loadChildren: '../entidade/entidade.module#EntidadeModule'},
      {path: 'animal', loadChildren: '../animal/animal.module#AnimalModule'},
      {path: 'movimentacao', loadChildren: '../movimentacao/movimentacao.module#MovimentacaoModule'}
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]

})

export class HomeRoutingModule {

}
