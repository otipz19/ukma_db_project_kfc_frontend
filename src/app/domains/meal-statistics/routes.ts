import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const MEAL_STATS_ROUTES: Routes = [
  {
    path: 'meal-statistics',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.MANAGER)],
    loadComponent: () => import('./view/pages/meals-stats-page/meals-stats-page.component').then(r => r.MealsStatsPageComponent)
  }
];
