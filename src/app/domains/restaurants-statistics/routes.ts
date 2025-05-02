import {Routes} from "@angular/router";
import {UserRole} from "../../api";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";

export const RESTAURANTS_STATS_ROUTES: Routes = [
  {
    path: 'restaurants-statistics',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    loadComponent: () => import('./view/pages/restaurants-stats-page/restaurants-stats-page.component').then(r => r.RestaurantsStatsPageComponent)
  }
];
