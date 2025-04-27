import {Routes} from "@angular/router";
import {managersRedirectRouteGuard} from "../../core/route-guards/managers-redirect.route-guard";
import {
  EMPLOYEE_RESOLVER_KEY,
  employeeResolver
} from "./data-access/resolvers/employee.resolver";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: 'employees',
    children: [
      {
        path: '',
        canActivate: [managersRedirectRouteGuard(['restaurants', e => e.restaurantId, 'employees'])],
        loadComponent: () => import('./view/pages/employees-page/employees-page.component').then(r => r.EmployeesPageComponent)
      },
      {
        path: ':employeeId',
        resolve: {[EMPLOYEE_RESOLVER_KEY]: employeeResolver},
        loadComponent: () => import('./view/pages/employee-profile/employee-profile.component').then(r => r.EmployeeProfileComponent)
      },
      {
        path: 'create',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
        loadComponent: () => import('./features/create-employee/view/pages/create-employee-page/create-employee-page.component').then(r => r.CreateEmployeePageComponent)
      },
      {
        path: 'update/:employeeId',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
        resolve: {[EMPLOYEE_RESOLVER_KEY]: employeeResolver},
        loadComponent: () => import('./features/update-employee/view/pages/update-employee-page/update-employee-page.component').then(r => r.UpdateEmployeePageComponent)
      }
    ]
  }
];
