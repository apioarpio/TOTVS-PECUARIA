import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PoModule} from '@portinari/portinari-ui';
import {NgxElectronModule} from "ngx-electron";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PoStorageModule} from "@portinari/portinari-storage";
import {FormsModule} from "@angular/forms";
import {HomeModule} from "./pages/home/home.module";
import {ComponentsModule} from "./components/components.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    BrowserAnimationsModule,

    //Router Module
    AppRoutingModule,

    //App Modules
    HomeModule,
    ComponentsModule,

    //Portinari Modules
    PoModule,
    PoStorageModule.forRoot({
      name: 'pecuariaStorage',
      storeName: '_pecuariaStore',
      driverOrder: ['lokijs']
    })
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
