import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //redirectTo:'',
    // loadChildren:'./add-on/add-on.module#AddOnModule',
    // data: {
    //  // title: 'Forms Components',
    //   status: false
    // },
    children: [
      {
        path: 'modifiers',
        loadChildren: () => import('./modifiers/modifiers.module').then(m => m.ModifiersModule)
      },
      {
        path: 'edit-item/:id',
        loadChildren: () => import('./edit-item/edit-item.module').then(m => m.EditItemModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      },
      {
        path: 'add-on',
        loadChildren: () => import('./add-on/add-on.module').then(m => m.AddOnModule)
      },
      {
        path: 'new-group',
        loadChildren: () => import('./new-group/new-group.module').then(m => m.NewGroupModule)
      },
      {
        path: 'quick-item',
        loadChildren: () => import('./quick-item/quick-item.module').then(m => m.QuickItemModule)
      },
      {
        path: 'advance',
        loadChildren: () => import('./advance-elements/advance-elements.module').then(m => m.AdvanceElementsModule)
      },
      {
        path: 'validation',
        loadChildren: () => import('./form-validation/form-validation.module').then(m => m.FormValidationModule)
      },
      {
        path: 'picker',
        loadChildren: () => import('./form-picker/form-picker.module').then(m => m.FormPickerModule)
      },
      {
        path: 'select',
        loadChildren: () => import('./form-select/form-select.module').then(m => m.FormSelectModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
