import {NgModule} from "@angular/core";
import {EntidadeRoutingModule} from "./entidade-routing.module";
import {IndexEntidadesComponent} from "./index-entidades/index-entidades.component";
import {FormsModule} from "@angular/forms";
import {PoButtonModule, PoFieldModule, PoTableModule} from "@portinari/portinari-ui";

@NgModule({

  declarations:[
    IndexEntidadesComponent
  ],
  imports:[
    FormsModule,
    EntidadeRoutingModule,

    PoFieldModule,
    PoButtonModule,
    PoTableModule
  ]

})

export class EntidadeModule {

}
