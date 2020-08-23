import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from "./layout/auth/auth.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/login/simple',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./theme/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'maintenance/offline-ui',
        loadChildren: () => import('./theme/maintenance/offline-ui/offline-ui.module').then(m => m.OfflineUiModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./theme/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./theme/ui-elements/basic/basic.module').then(m => m.BasicModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./theme/customer-info/customer-info.module').then(m => m.CustomerInfoModule)
      },
      {
        path: 'store',
        loadChildren: () => import('./theme/store-info/store-info.module').then(m => m.StoreInfoModule)
      },
      {
        path: 'terminal',
        loadChildren: () => import('./theme/terminal-info/terminal-info.module').then(m => m.TerminalInfoModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./theme/employee-info/employee-info.module').then(m => m.EmployeeInfoModule)
      },
      {
        path: 'access-control',
        loadChildren: () => import('./theme/permission-info/permission-info.module').then(m => m.PermissionInfoModule)
      },
      {
        path: 'advance',
        loadChildren: () => import('./theme/ui-elements/advance/advance.module').then(m => m.AdvanceModule)
      },
      {
        path: 'animations',
        loadChildren: () => import('./theme/ui-elements/animation/animation.module').then(m => m.AnimationModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./theme/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'bootstrap-table',
        loadChildren: () => import('./theme/table/bootstrap-table/bootstrap-table.module').then(m => m.BootstrapTableModule)
      },
      {
        path: 'data-table',
        loadChildren: () => import('./theme/table/data-table/data-table.module').then(m => m.DataTableModule)
      },
      {
        path: 'maintenance/error',
        loadChildren: () => import('./theme/maintenance/error/error.module').then(m => m.ErrorModule)
      },
      {
        path: 'maintenance/coming-soon',
        loadChildren: () => import('./theme/maintenance/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./theme/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./theme/task/task.module').then(m => m.TaskModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./theme/extension/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'file-upload-ui',
        loadChildren: () => import('./theme/extension/file-upload-ui/file-upload-ui.module').then(m => m.FileUploadUiModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./theme/chart/chart.module').then(m => m.ChartModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./theme/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'widget',
        loadChildren: () => import('./theme/widget/widget.module').then(m => m.WidgetModule)
      },
      {
        path: 'simple-page',
        loadChildren: () => import('./theme/simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
