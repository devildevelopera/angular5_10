import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { TestRoutes } from './test.routing';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    TestRoutes
  ],
  declarations: [TestComponent, ListComponent]
})
export class TestModule { }
