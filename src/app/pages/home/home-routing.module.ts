import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./index/home.component";
import {HomeInfoComponent} from "./home-info/home-info.component";

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/info'
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'info', component: HomeInfoComponent},
      {path: 'entidade', loadChildren: '../entidade/entidade.module#EntidadeModule'},
      {path: 'animal', loadChildren: '../animal/animal.module#AnimalModule'},
      {path: 'operacoesCurral', loadChildren: '../operacoes-curral/operacoes-curral.module#OperacoesCurralModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {

}
