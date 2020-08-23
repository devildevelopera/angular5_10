import { Routes, RouterModule } from '@angular/router';
import { QuickItemComponent } from './quick-item.component';

const routes: Routes = [
  { 
    path: '',
    component: QuickItemComponent
   },
];

export const QuickItemRoutes = RouterModule.forChild(routes);
