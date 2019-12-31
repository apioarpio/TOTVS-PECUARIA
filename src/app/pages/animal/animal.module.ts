import {NgModule} from "@angular/core";
import {IndexAnimaisComponent} from "./index-animais/index-animais.component";
import {AnimalRoutingModule} from "./animal-routing.module";
import {PoButtonModule} from "@portinari/portinari-ui";

@NgModule({

  declarations:[
    IndexAnimaisComponent
  ],
  imports:[
    AnimalRoutingModule,

    //PortinariModules
    PoButtonModule
  ]

})

export class AnimalModule {

}
