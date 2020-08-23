import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Invoice',
      status: false
    },
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./basic-invoice/basic-invoice.module').then(m => m.BasicInvoiceModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('./invoice-summary/invoice-summary.module').then(m => m.InvoiceSummaryModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./invoice-list/invoice-list.module').then(m => m.InvoiceListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
