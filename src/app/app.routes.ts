import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registration'
  },
  {
    path: 'registration',
    loadComponent: () => import('./domains/registration/view/page/registration-page.component').then(r => r.RegistrationPageComponent)
  }
];
