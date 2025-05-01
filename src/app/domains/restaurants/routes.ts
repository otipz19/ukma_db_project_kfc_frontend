import {Routes} from "@angular/router";
import {managersRedirectRouteGuard} from "../../core/route-guards/managers-redirect.route-guard";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {RESTAURANT_RESOLVER_KEY, restaurantResolver} from "./data-access/resolvers/restaurant.resolver";
import {EMPLOYEE_RESOLVER_KEY, employeeResolver} from "../employees/data-access/resolvers/employee.resolver";
import {UserRole} from "../../api";
import {ORDER_RESOLVER_KEY, orderResolver} from "../orders/data-access/resolvers/order.resolver";

export const RESTAURANT_ROUTES: Routes = [
  {
    path: 'restaurants',
    children: [
      {
        path: '',
        canActivate: [managersRedirectRouteGuard(['restaurants', e => e.restaurantId])],
        loadComponent: () => import('./view/pages/restaurants-page/restaurants-page.component').then(r => r.RestaurantsPageComponent)
      },
      {
        path: ':restaurantId',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.COOK, UserRole.CASHIER)],
        resolve: {
          [RESTAURANT_RESOLVER_KEY]: restaurantResolver
        },
        children: [
          {
            path: '',
            loadComponent: () => import("./view/pages/restaurant-dashboard/restaurant-dashboard.component").then(r => r.RestaurantDashboardComponent)
          },
          {
            path: 'orders',
            children: [
              {
                path: '',
                loadComponent: () => import('../orders/view/pages/admin-orders-page/employee-orders-page.component').then(r => r.EmployeeOrdersPageComponent)
              },
              {
                path: ':orderId',
                resolve: {[ORDER_RESOLVER_KEY]: orderResolver},
                loadComponent: () => import('../orders/view/pages/order-view-page/order-view-page.component').then(r => r.OrderViewPageComponent)
              }
            ]
          },
          {
            path: 'employees',
            children: [
              {
                path: '',
                loadComponent: () => import("../employees/view/pages/employees-page/employees-page.component").then(r => r.EmployeesPageComponent)
              },
              {
                path: 'create',
                loadComponent: () => import('../employees/features/create-employee/view/pages/create-employee-page/create-employee-page.component').then(r => r.CreateEmployeePageComponent)
              },
              {
                path: ':employeeId',
                resolve: {[EMPLOYEE_RESOLVER_KEY]: employeeResolver},
                loadComponent: () => import('../employees/view/pages/employee-profile/employee-profile.component').then(r => r.EmployeeProfileComponent)
              }
            ]
          }
        ]
      },
    ]
  }
]
