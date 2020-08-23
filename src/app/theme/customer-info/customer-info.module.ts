import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { CustomerInfoRoutingModule } from './customer-info-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationsService} from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
import { CheckboxComponent } from './customer/checkbox/checkbox.component';
@NgModule({
  imports: [
    CommonModule,
    CustomerInfoRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
  ],
  declarations: [ CustomerComponent, CheckboxComponent],
  providers:[NotificationsService,NgxUiLoaderService]
})
export class CustomerInfoModule { }
