import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      status: false
    },
    children: [
      {
        path: 'default',
        loadChildren: () => import('./default/default.module').then(m => m.DefaultModule)
      },
      {
        path: 'sales/custom',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'ecommerce',
        loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
