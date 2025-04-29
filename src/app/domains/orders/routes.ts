import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const ORDERS_ROUTES: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: 'create',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.CLIENT, UserRole.CASHIER, UserRole.MANAGER)],
        loadComponent: () => import('./view/pages/create-order-page/create-order-page.component').then(r => r.CreateOrderPageComponent)
      }
    ]
  }
];
