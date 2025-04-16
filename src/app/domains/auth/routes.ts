import {Routes} from "@angular/router";
import {unauthenticatedRouteGuard} from "../../core/route-guards/unauthenticated.route-guard";

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivateChild: [unauthenticatedRouteGuard],
    loadComponent: () => import('../../layouts/auth/auth-layout.component').then(r => r.AuthLayoutComponent),
    children: [
      {
        path: 'registration',
        loadComponent: () => import('./pages/registration/view/components/registration-form/registration-form.component').then(r => r.RegistrationFormComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/view/components/login-form/login-form.component').then(r => r.LoginFormComponent)
      }
    ]
  },
]
