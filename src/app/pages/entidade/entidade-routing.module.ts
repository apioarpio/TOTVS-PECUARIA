import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexEntidadesComponent} from "./index-entidades/index-entidades.component";

const entidadeRoutes: Routes = [
  {
    path: '',
    component: IndexEntidadesComponent
  }
];

@NgModule({

  imports: [RouterModule.forChild(entidadeRoutes)],
  exports: [RouterModule]

})

export class EntidadeRoutingModule {

}
