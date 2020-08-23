import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PermissionComponent } from './permission/permission.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionEditComponent } from './permission-edit/PermissionEditComponent';


const routes: Routes = [
  {
    path: 'list',
    data: {
      title: 'Access Level',
      status: false
    },
    component:PermissionComponent
    
  },
  {
    path: 'add',
    data: {
      title: 'Add New Access Level',
      status: false
    },
    component:PermissionAddComponent
    
  },
  {
    path: 'edit/:id',
    data: {
      title: 'Edit Access Level',
      status: false
    },
    component:PermissionEditComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionInfoRoutingModule { }
