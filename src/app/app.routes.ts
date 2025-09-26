import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/feature/dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/feature/dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import(
        '../app/feature/expences/expense-list/expense-list.component'
      ).then((c) => c.ExpenseListComponent),
  },

  {
    path: 'tasks',
    loadComponent: () =>
      import('../app/feature/task/task-list/task-list.component').then(
        (c) => c.TaskListComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import(
        '../app/feature/settings/profile-form/profile-form.component'
      ).then((c) => c.ProfileFormComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/feature/dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
];
