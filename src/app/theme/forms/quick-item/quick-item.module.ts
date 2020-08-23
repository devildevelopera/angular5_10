import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickItemComponent } from './quick-item.component';
import { QuickItemRoutes } from './quick-item.routing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { QuickItemService } from './quick-item.service';

@NgModule({
  imports: [
    CommonModule,
    QuickItemRoutes,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    NgxUiLoaderModule
  ],
  declarations: [QuickItemComponent],
  providers:[NotificationsService,NgxUiLoaderService, QuickItemService]
})
export class QuickItemModule { }
