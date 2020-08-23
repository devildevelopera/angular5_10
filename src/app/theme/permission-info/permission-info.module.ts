import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { PermissionInfoRoutingModule } from './permission-info-routing.module';
import { PermissionComponent } from './permission/permission.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationsService} from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
import { CheckboxComponent } from './permission/checkbox/checkbox.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PermissionEditComponent } from './permission-edit/PermissionEditComponent';
import { PermissionInfo } from './permission-info.interface';
@NgModule({
  imports: [
    CommonModule,
    PermissionInfoRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    UiSwitchModule

  ],
  declarations: [ PermissionComponent,CheckboxComponent,PermissionAddComponent,PermissionEditComponent],
  providers:[NotificationsService,NgxUiLoaderService,PermissionInfo]
})
export class PermissionInfoModule { }
