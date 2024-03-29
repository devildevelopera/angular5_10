import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicElementsComponent} from './basic-elements.component';

const routes: Routes = [
  {
    path: '',
    component: BasicElementsComponent,
    // data: {
    //   title: 'Inventory',
    //   icon: 'icon-layers',
    //   status: true
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicElementsRoutingModule { }
