import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { ExportIdModel } from './exportId1.model';
import { DashboardService } from '../dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationsService } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    ChartModule
  ],
  declarations: [SalesComponent],
providers:[]
})
export class SalesModule { }
