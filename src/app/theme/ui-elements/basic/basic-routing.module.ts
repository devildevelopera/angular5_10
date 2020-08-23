import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Basic Components',
      status: false
    },
    children: [
      {
        path: 'alert',
        loadChildren: () => import('./alert/alert.module').then(m => m.AlertModule)
      },
      {
        path: 'breadcrumb',
        loadChildren: () => import('./breadcrumb/breadcrumb.module').then(m => m.BreadcrumbModule)
      },
      {
        path: 'button',
        loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)
      },
      {
        path: 'box-shadow',
        loadChildren: () => import('./box-shadow/box-shadow.module').then(m => m.BoxShadowModule)
      },
      {
        path: 'accordion',
        loadChildren: () => import('./accordion/accordion.module').then(m => m.AccordionModule)
      },
      {
        path: 'generic-class',
        loadChildren: () => import('./generic-class/generic-class.module').then(m => m.GenericClassModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule)
      },
      {
        path: 'label-badge',
        loadChildren: () => import('./label-badge/label-badge.module').then(m => m.LabelBadgeModule)
      },
      {
        path: 'typography',
        loadChildren: () => import('./typography/typography.module').then(m => m.TypographyModule)
      },
      {
        path: 'other',
        loadChildren: () => import('./basic-other/basic-other.module').then(m => m.BasicOtherModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
