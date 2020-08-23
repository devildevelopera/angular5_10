import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Widget',
      status: false
    },
    children: [
      {
        path: 'statistic',
        loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticModule)
      },
      {
        path: 'data',
        loadChildren: () => import('./data-widget/data-widget.module').then(m => m.DataWidgetModule)
      },
      {
        path: 'chart',
        loadChildren: () => import('./chart-widget/chart-widget.module').then(m => m.ChartWidgetModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }
