import { Routes, RouterModule } from '@angular/router';
import { NewGroupComponent } from './new-group.component';

const routes: Routes = [
  { path: '', component: NewGroupComponent },
];

export const NewGroupRoutes = RouterModule.forChild(routes);
