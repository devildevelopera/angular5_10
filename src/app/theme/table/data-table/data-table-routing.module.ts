import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Data Table',
      status: false
    },
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./table-basic-data/table-basic-data.module').then(m => m.TableBasicDataModule)
      },
      {
        path: 'editable',
        loadChildren: () => import('./table-edit/table-edit.module').then(m => m.TableEditModule)
      },
      {
        path: 'row-details',
        loadChildren: () => import('./row-details/row-details.module').then(m => m.RowDetailsModule)
      },
      {
        path: 'paging',
        loadChildren: () => import('./paging/paging.module').then(m => m.PagingModule)
      },
      {
        path: 'selection',
        loadChildren: () => import('./selection/selection.module').then(m => m.SelectionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableRoutingModule { }
