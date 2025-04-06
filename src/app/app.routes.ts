import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main/main-layout.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'auth',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadComponent: () => import('./layouts/auth/auth-layout.component').then(r => r.AuthLayoutComponent),
        children: [
          {
            path: 'registration',
            loadComponent: () => import('./domains/auth/pages/registration/view/components/registration-form/registration-form.component').then(r => r.RegistrationFormComponent)
          },
          {
            path: 'login',
            loadComponent: () => import('./domains/auth/pages/login/view/components/login-form/login-form.component').then(r => r.LoginFormComponent)
          }
        ]
      },
      {
        path: 'ingredients',
        loadComponent: () => import('./domains/ingredients/view/pages/ingredient-list/ingredient-list.component').then(r => r.IngredientListComponent)
      }
    ]
  }
];
