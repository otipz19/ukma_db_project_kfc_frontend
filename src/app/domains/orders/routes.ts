import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";
import {authenticatedRouteGuard} from "../../core/route-guards/authenticated.route-guard";

export const ORDERS_ROUTES: Routes = [
  {
    path: 'orders',
    canActivate: [authenticatedRouteGuard],
    children: [
      {
        path: 'create',
        canActivate: [hasRoleRouteGuard(UserRole.CLIENT, UserRole.CASHIER, UserRole.MANAGER)],
        loadComponent: () => import('./view/pages/create-order-page/create-order-page.component').then(r => r.CreateOrderPageComponent)
      }
    ]
  }
];
