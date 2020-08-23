import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditItemComponent } from './edit-item.component';
import { EditItemRoutes } from './edit-item.routing';
import { InventoryService } from '../inventory.service';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EditItemRoutes,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule,
    NgxUiLoaderModule,
    FileUploadModule
  ],
  declarations: [EditItemComponent],
  providers: [InventoryService, NotificationsService, NgxUiLoaderService ]
})
export class EditItemModule { }
