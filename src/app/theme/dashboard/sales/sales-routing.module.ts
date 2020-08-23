import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    data: {
      title: 'Default',
      icon: 'icon-home',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: false,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
