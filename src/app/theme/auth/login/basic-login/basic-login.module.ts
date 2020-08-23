import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLoginComponent } from './basic-login.component';
import {BasicLoginRoutingModule} from './basic-login-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginVModal } from './basic-login.modal';

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  declarations: [BasicLoginComponent],
  providers: [
    LoginVModal
  ]
})
export class BasicLoginModule { }
