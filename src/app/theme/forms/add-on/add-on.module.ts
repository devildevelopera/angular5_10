import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOnComponent } from './add-on.component';
import {AddOnRoutingModule} from './add-on-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { CheckboxComponent } from '../add-on/checkbox/checkbox.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationsService} from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule ,NgxUiLoaderService,NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION} from  'ngx-ui-loader';
// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   // bgsColor: '#OOACC1',
//   // bgsOpacity: 0.5,
//   // bgsPosition: POSITION.bottomCenter,
//   // bgsSize: 60,
//   bgsType: SPINNER.ballSpinClockwise,
//   // fgsColor: '#00ACC1',
//   // fgsPosition: POSITION.centerCenter,
//   // fgsSize: 60,
//   fgsType: SPINNER.ballSpinClockwise,
//   // logoUrl: 'assets/angular.png',
//   // pbColor: '#FF0000',
//   // pbDirection: PB_DIRECTION.leftToRight,
//   // pbThickness: 5,
//   // text: 'Welcome to ngx-ui-loader',
//   // textColor: '#FFFFFF',
//   // textPosition: POSITION.centerCenter
// };
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddOnRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FileUploadModule,
    SimpleNotificationsModule,
    NgxUiLoaderModule
  ],
  declarations: [AddOnComponent,CheckboxComponent],
  providers:[NotificationsService,NgxUiLoaderService]
})
export class AddOnModule { }
