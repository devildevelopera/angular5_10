import { Routes, RouterModule } from '@angular/router';
import { EditItemComponent } from './edit-item.component';

const routes: Routes = [
  {
    path: '',
    component: EditItemComponent
   },
];

export const EditItemRoutes = RouterModule.forChild(routes);
