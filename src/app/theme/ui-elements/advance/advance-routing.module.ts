import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Advance Components',
      status: false
    },
    children: [
      {
        path: 'modal',
        loadChildren: () => import('./modal/modal.module').then(m => m.ModalModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'notify',
        loadChildren: () => import('./notify/notify.module').then(m => m.NotifyModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceRoutingModule { }
