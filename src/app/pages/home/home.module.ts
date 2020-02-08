import {NgModule} from "@angular/core";
import {HomeComponent} from "./index/home.component";
import {ComponentsModule} from "../../components/components.module";
import {
  PoButtonModule,
  PoFieldModule,
  PoMenuModule,
  PoModule,
  PoPageModule,
  PoTableModule
} from "@portinari/portinari-ui";
import {FormsModule} from "@angular/forms";
import {HomeRoutingModule} from "./home-routing.module";
import {CommonModule} from "@angular/common";
import {ChartsModule} from "ng2-charts";
import { HomeInfoComponent } from './home-info/home-info.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeInfoComponent
  ],
  imports: [
    FormsModule,
    HomeRoutingModule,
    ComponentsModule,
    CommonModule,
    //portinari modules
    PoFieldModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    PoMenuModule,
    // ng2 Charts
    ChartsModule,
    PoModule
  ],
})

export class HomeModule {

}
