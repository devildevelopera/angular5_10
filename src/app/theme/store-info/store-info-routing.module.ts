import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StoreComponent } from './store/store.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stores',
      status: false
    },
    component:StoreComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreInfoRoutingModule { }
