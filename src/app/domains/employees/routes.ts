import {Routes} from "@angular/router";
import {managersRedirectRouteGuard} from "../../core/route-guards/managers-redirect.route-guard";
import {
  UPDATE_EMPLOYEE_RESOLVER_KEY,
  updateEmployeeResolver
} from "./features/update-employee/data-access/resolvers/update-employee.resolver";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: 'employees',
    canActivate: [managersRedirectRouteGuard(['restaurants', e => e.restaurantId, 'employees'])],
    children: [
      {
        path: '',
        loadComponent: () => import('./view/pages/employees-page/employees-page.component').then(r => r.EmployeesPageComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./features/create-employee/view/pages/create-employee-page/create-employee-page.component').then(r => r.CreateEmployeePageComponent)
      },
      {
        path: 'update/:id',
        resolve: {[UPDATE_EMPLOYEE_RESOLVER_KEY]: updateEmployeeResolver},
        loadComponent: () => import('./features/update-employee/view/pages/update-employee-page/update-employee-page.component').then(r => r.UpdateEmployeePageComponent)
      }
    ]
  }
];
