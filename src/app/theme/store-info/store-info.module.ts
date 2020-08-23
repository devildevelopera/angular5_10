import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { StoreInfoRoutingModule } from './store-info-routing.module';
import { StoreComponent } from './store/store.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationsService} from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
import { UiSwitchModule } from 'ngx-ui-switch';
@NgModule({
  imports: [
    CommonModule,
    StoreInfoRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    UiSwitchModule

  ],
  declarations: [ StoreComponent],
  providers:[NotificationsService,NgxUiLoaderService]
})
export class StoreInfoModule { }
