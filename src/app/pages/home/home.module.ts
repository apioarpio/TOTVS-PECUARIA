import {NgModule} from "@angular/core";
import {HomeComponent} from "./index/home.component";
import {ComponentsModule} from "../../components/components.module";
import {PoButtonModule, PoFieldModule, PoMenuModule, PoPageModule, PoTableModule} from "@portinari/portinari-ui";
import {FormsModule} from "@angular/forms";
import {HomeRoutingModule} from "./home-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    FormsModule,
    HomeRoutingModule,
    ComponentsModule,
    PoMenuModule,
    //portinari modules
    PoFieldModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    CommonModule
  ],
})

export class HomeModule {

}
