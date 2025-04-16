import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main/main-layout.component";
import {hasRoleRouteGuard} from "./core/route-guards/has-role-route.guard";
import {authenticatedRouteGuard} from "./core/route-guards/authenticated.route-guard";
import {AUTH_ROUTES} from "./domains/auth/routes";
import {RESTAURANT_ROUTES} from "./domains/restaurants/routes";
import {EMPLOYEES_ROUTES} from "./domains/employees/routes";

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
      ...AUTH_ROUTES,
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
      ...RESTAURANT_ROUTES,
      ...EMPLOYEES_ROUTES,
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
