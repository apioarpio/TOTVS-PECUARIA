import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {ComponentsModule} from "../../components/components.module";
import {HomeRoutingModule} from "./home/home-routing.module";
import {PoButtonModule, PoFieldModule, PoPageModule, PoTableModule} from "@portinari/portinari-ui";
import {IndexEntidadesComponent} from "../../components/cadastros/entidades/index-entidades/index-entidades.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    IndexEntidadesComponent
  ],
  imports: [
    FormsModule,
    HomeRoutingModule,
    ComponentsModule,

    //portinari modules
    PoFieldModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule

  ],
})

export class HomeModule {

}
