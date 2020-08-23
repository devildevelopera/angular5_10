import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicElementsComponent } from './basic-elements.component';
import {BasicElementsRoutingModule} from './basic-elements-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
 import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material/input';
 import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    BasicElementsRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    NgxUiLoaderModule,
    AmazingTimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [BasicElementsComponent, CheckboxComponent],
  providers:[NgxUiLoaderService , MatDatepickerModule
  ]
})
export class BasicElementsModule { }
