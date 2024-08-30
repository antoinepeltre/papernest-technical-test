import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.route').then(m => m.homepageRoutes),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/task.route').then(m => m.taskRoutes),
  },
  // Ajoutez un wildcard pour gérer les routes non définies
  {
    path: '**',
    redirectTo: 'homepage'
  }
];
