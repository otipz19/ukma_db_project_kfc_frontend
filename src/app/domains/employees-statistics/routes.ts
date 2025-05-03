import {Routes} from "@angular/router";
import {managersRedirectRouteGuard} from "../../core/route-guards/managers-redirect.route-guard";

export const EMPLOYEE_STATS_ROUTES: Routes = [
  {
    path: 'employee-statistics',
    canActivate: [managersRedirectRouteGuard(['restaurants', e => e.restaurantId, 'employee-statistics'])],
    loadComponent: () => import('./view/pages/employee-stats-page/employee-stats-page.component').then(r => r.EmployeeStatsPageComponent)
  }
];
