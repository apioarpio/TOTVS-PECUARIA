import {NgModule} from "@angular/core";
import {IndexAnimaisComponent} from "./index-animais/index-animais.component";
import {AnimalRoutingModule} from "./animal-routing.module";
import {PoButtonModule, PoTableModule} from "@portinari/portinari-ui";

@NgModule({

  declarations: [
    IndexAnimaisComponent
  ],
  imports: [
    AnimalRoutingModule,

    //PortinariModules
    PoButtonModule,
    PoTableModule
  ]

})

export class AnimalModule {

}
