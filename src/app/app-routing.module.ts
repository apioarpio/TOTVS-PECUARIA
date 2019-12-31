import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
    pathMatch: 'full'
  },
  // {
  //   path: 'authenticated',
  //   loadChildren:'./pages/index/index.module#HomeModule',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
