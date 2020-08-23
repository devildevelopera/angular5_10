import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';


const routes: Routes = [
  {
    path: 'list',
    data: {
      title: 'Employees',
      status: false
    },
    component:EmployeeComponent
    
  },
  {
    path: 'add',
    data: {
      title: 'Add Employees',
      status: false
    },
    component:EmployeeAddComponent
    
  },
  {
    path: 'edit/:id',
    data: {
      title: 'Edit Employees',
      status: false
    },
    component:EmployeeEditComponent
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeInfoRoutingModule { }
