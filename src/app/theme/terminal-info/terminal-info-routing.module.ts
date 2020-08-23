import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TerminalComponent } from './terminal/terminal.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'terminals',
      status: false
    },
    component:TerminalComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalInfoRoutingModule { }
