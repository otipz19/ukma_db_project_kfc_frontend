import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./core/view/unauthorized-layout/unauthorized-layout.component').then(r => r.UnauthorizedLayoutComponent),
    children: [
      {
        path: 'registration',
        loadComponent: () => import('./domains/registration/view/components/registration-form/registration-form.component').then(r => r.RegistrationFormComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./domains/login/view/components/login-form/login-form.component').then(r => r.LoginFormComponent)
      }
    ]
  },
];
