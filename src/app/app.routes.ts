import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main/main-layout.component";
import {hasRoleRouteGuard} from "./core/route-guards/has-role.route-guard";
import {unauthenticatedRouteGuard} from "./core/route-guards/unauthenticated.route-guard";
import {authenticatedRouteGuard} from "./core/route-guards/authenticated.route-guard";

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
        pathMatch: 'full',
      },
      {
        path: 'auth',
        canActivateChild: [unauthenticatedRouteGuard],
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
        path: 'landing',
        canActivate: [authenticatedRouteGuard],
        loadComponent: () => import('./domains/dumb-pages/view/pages/landing-page/landing-page.component').then(r => r.LandingPageComponent)
      },
      {
        path: 'ingredients',
        canActivate: [hasRoleRouteGuard('ADMIN')],
        loadComponent: () => import('./domains/ingredients/view/pages/ingredients-page/ingredients-page.component').then(r => r.IngredientsPageComponent)
      },
      {
        path: 'restaurants',
        canActivate: [hasRoleRouteGuard('ADMIN')],
        loadComponent: () => import('./domains/restaurants/view/pages/restaurants-page/restaurants-page.component').then(r => r.RestaurantsPageComponent)
      },
      {
        path: 'employees',
        redirectTo: 'employees',
        pathMatch: 'full',

      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            canActivate: [hasRoleRouteGuard('ADMIN')],
            loadComponent: () => import('./domains/employees/view/pages/employees-page/employees-page.component').then(r => r.EmployeesPageComponent)
          },
          {
            path: 'create',
            canActivate: [hasRoleRouteGuard('ADMIN')],
            loadComponent: () => import('./domains/employees/view/pages/create-employee-page/create-employee-page.component').then(r => r.CreateEmployeePageComponent)
          }
        ]
      },
      {
        path: 'forbidden',
        canActivate: [authenticatedRouteGuard],
        loadComponent: () => import('./domains/dumb-pages/view/pages/forbidden-page/forbidden-page.component').then(r => r.ForbiddenPageComponent)
      },
      {
        path: '**',
        loadComponent: () => import('./domains/dumb-pages/view/pages/not-found/not-found.component').then(r => r.NotFoundComponent)
      }
    ]
  }
];
