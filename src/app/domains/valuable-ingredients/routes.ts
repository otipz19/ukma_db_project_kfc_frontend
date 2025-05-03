import {Routes} from "@angular/router";
import {UserRole} from "../../api";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";

export const VALUABLE_INGREDIENTS_ROUTES: Routes = [
  {
    path: 'valuable-ingredients',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    loadComponent: () => import('./view/pages/valuable-ingredients-page/valuable-ingredients-page.component').then(r => r.ValuableIngredientsPageComponent)
  }
]
