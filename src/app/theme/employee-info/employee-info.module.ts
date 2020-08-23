import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { EmployeeInfoRoutingModule } from './employee-info-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationsService} from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
import { CheckboxComponent } from './employee/checkbox/checkbox.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeClass } from './employee.interface';
@NgModule({
  imports: [
    CommonModule,
    EmployeeInfoRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,


  ],
  declarations: [ EmployeeComponent,CheckboxComponent,EmployeeEditComponent,EmployeeAddComponent],
  providers:[NotificationsService,NgxUiLoaderService,EmployeeClass]
})
export class EmployeeInfoModule { }
