import {Routes} from "@angular/router";
import {UserRole} from "../../api";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";

export const ADVENT_CLIENTS_ROUTES: Routes = [
  {
    path: 'adventurous-clients',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    loadComponent: () => import('./view/pages/advent-clients-page/advent-clients-page.component').then(r => r.AdventClientsPageComponent)
  }
];
