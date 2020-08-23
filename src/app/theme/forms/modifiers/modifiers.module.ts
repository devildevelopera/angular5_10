import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifiersComponent } from './modifiers.component';
import { ModifierRoutes } from './modifier.routing';
import { ModifierListComponent } from './modifier-list/modifier-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { ModifiersService } from './modifiers.service';
import { InventoryService } from '../inventory.service';

@NgModule({
  imports: [
    CommonModule,
    ModifierRoutes,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    NgxUiLoaderModule
  ],
  declarations: [ModifiersComponent, ModifierListComponent],
  providers: [NotificationsService,NgxUiLoaderService, ModifiersService, InventoryService]
})
export class ModifiersModule { }
