import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const EMPLOYEE_STATS_ROUTES: Routes = [
  {
    path: 'employee-statistics',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.MANAGER)],
    loadComponent: () => import('./view/pages/employee-stats-page/employee-stats-page.component').then(r => r.EmployeeStatsPageComponent)
  }
];
