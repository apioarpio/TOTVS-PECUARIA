import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexAnimaisComponent} from "./index-animais/index-animais.component";

const animalRoutes: Routes = [
  {path: '', component: IndexAnimaisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(animalRoutes)],
  exports: [RouterModule]
})

export class AnimalRoutingModule {

}
