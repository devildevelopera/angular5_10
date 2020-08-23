import { Routes, RouterModule } from '@angular/router';
import { ModifiersComponent } from './modifiers.component';

const routes: Routes = [
  {
    path: '',
    component: ModifiersComponent,
    data: {
      title: 'Modifiers',
      status: false
    }
   }
];

export const ModifierRoutes = RouterModule.forChild(routes);
