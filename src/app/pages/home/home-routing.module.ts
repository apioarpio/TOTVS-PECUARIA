import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {IndexAnimaisComponent} from "../../../components/cadastros/animais/index-animais/index-animais.component";
import {IndexEntidadesComponent} from "../../entidade/index-entidades/index-entidades.component";

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index'
  },
  {
    path: 'index', component: HomeComponent,
    children: [
      {path: 'entidade', component: IndexEntidadesComponent},
      {path: 'animal', component: IndexAnimaisComponent}
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]

})

export class HomeRoutingModule {

}
