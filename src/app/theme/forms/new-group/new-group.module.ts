import { ModifierGroupService } from './modifier-group.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGroupComponent } from './new-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { NewGroupRoutes } from './new-group.routing';
import { InventoryService } from '../inventory.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    NgxUiLoaderModule,
    NewGroupRoutes
  ],
  declarations: [NewGroupComponent],
  providers: [NotificationsService,NgxUiLoaderService, InventoryService , ModifierGroupService]
})
export class NewGroupModule { }
