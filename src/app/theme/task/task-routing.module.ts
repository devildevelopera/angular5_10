import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./task-list/task-list.module').then(m => m.TaskListModule)
      },
      {
        path: 'board',
        loadChildren: () => import('./task-board/task-board.module').then(m => m.TaskBoardModule)
      },
      {
        path: 'details',
        loadChildren: () => import('./task-details/task-details.module').then(m => m.TaskDetailsModule)
      },
      {
        path: 'issue',
        loadChildren: () => import('./task-issue/task-issue.module').then(m => m.TaskIssueModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
