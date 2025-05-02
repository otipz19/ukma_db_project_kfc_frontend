import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main/main-layout.component";
import {hasRoleRouteGuard} from "./core/route-guards/has-role-route.guard";
import {authenticatedRouteGuard} from "./core/route-guards/authenticated.route-guard";
import {AUTH_ROUTES} from "./domains/auth/routes";
import {RESTAURANT_ROUTES} from "./domains/restaurants/routes";
import {EMPLOYEES_ROUTES} from "./domains/employees/routes";
import {UserRole} from "./api";
import {MEALS_ROUTES} from "./domains/meals/routes";
import {CLIENTS_ROUTES} from "./domains/clients/routes";
import {ORDERS_ROUTES} from "./domains/orders/routes";
import {RESTAURANTS_STATS_ROUTES} from "./domains/restaurants-statistics/routes";

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
      ...RESTAURANT_ROUTES,
      ...EMPLOYEES_ROUTES,
      ...MEALS_ROUTES,
      ...CLIENTS_ROUTES,
      ...ORDERS_ROUTES,
      ...RESTAURANTS_STATS_ROUTES,
      {
        path: 'ingredients',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.COOK)],
        loadComponent: () => import('./domains/ingredients/view/pages/ingredients-page/ingredients-page.component').then(r => r.IngredientsPageComponent)
      },
      {
        path: 'landing',
        canActivate: [authenticatedRouteGuard],
        loadComponent: () => import('./domains/dumb-pages/view/pages/landing-page/landing-page.component').then(r => r.LandingPageComponent)
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
