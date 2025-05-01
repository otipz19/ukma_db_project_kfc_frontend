import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";
import {authenticatedRouteGuard} from "../../core/route-guards/authenticated.route-guard";
import {ORDER_RESOLVER_KEY, orderResolver} from "./data-access/resolvers/order.resolver";
import {roleRedirectRouteGuard} from "../../core/route-guards/managers-redirect.route-guard";

export const ORDERS_ROUTES: Routes = [
  {
    path: 'orders',
    canActivate: [authenticatedRouteGuard],
    children: [
      {
        path: '',
        canActivate: [
          roleRedirectRouteGuard([
            [UserRole.CLIENT, ['clients', client => client.id, 'orders']],
            [UserRole.MANAGER, ['restaurants', employee => employee.restaurantId, 'orders']],
            [UserRole.COOK, ['restaurants', employee => employee.restaurantId, 'orders']],
            [UserRole.CASHIER, ['restaurants', employee => employee.restaurantId, 'orders']],
          ])
        ],
        loadComponent: () => import('./view/pages/admin-orders-page/employee-orders-page.component').then(r => r.EmployeeOrdersPageComponent)
      },
      {
        path: 'create',
        canActivate: [hasRoleRouteGuard(UserRole.CLIENT, UserRole.CASHIER, UserRole.MANAGER)],
        loadComponent: () => import('./view/pages/create-order-page/create-order-page.component').then(r => r.CreateOrderPageComponent)
      },
      {
        path: ':orderId',
        resolve: {[ORDER_RESOLVER_KEY]: orderResolver},
        loadComponent: () => import('./view/pages/order-view-page/order-view-page.component').then(r => r.OrderViewPageComponent)
      }
    ]
  }
];
