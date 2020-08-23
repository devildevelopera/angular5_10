import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maps',
      status: false
    },
    children: [
      {
        path: 'google',
        loadChildren: () => import('./google-map/google-map.module').then(m => m.GoogleMapModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
