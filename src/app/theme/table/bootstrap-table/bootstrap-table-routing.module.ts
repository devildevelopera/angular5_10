import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bootstrap Table',
      status: false
    },
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./table-basic/table-basic.module').then(m => m.TableBasicModule)
      },
      {
        path: 'sizing',
        loadChildren: () => import('./sizing/sizing.module').then(m => m.SizingModule)
      },
      {
        path: 'border',
        loadChildren: () => import('./border/border.module').then(m => m.BorderModule)
      },
      {
        path: 'styling',
        loadChildren: () => import('./styling/styling.module').then(m => m.StylingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootstrapTableRoutingModule { }
