import {NgModule} from "@angular/core";
import {
  PoButtonModule,
  PoContainerModule,
  PoListViewModule,
  PoMenuModule,
  PoModalModule,
  PoToolbarModule
} from "@portinari/portinari-ui";
import {CommonModule} from "@angular/common";
import {ValidPesoDirective} from "./tronco/valid-peso.directive";
import { ValidateInputDirective } from './validate-input.directive';

@NgModule({
  declarations: [
    ValidPesoDirective,
    ValidateInputDirective
  ],
  imports: [
    CommonModule,
    //Portinari Modules
    PoMenuModule,
    PoModalModule,
    PoToolbarModule,
    PoListViewModule,
    PoButtonModule,
    PoContainerModule
  ],
  exports: [
    ValidPesoDirective
  ]
})

export class PecDirectivesModule {

}
