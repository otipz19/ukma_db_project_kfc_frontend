import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const IN_ACTIVE_USE_INGREDIENTS_ROUTES: Routes = [
  {
    path: 'in-active-use-ingredients',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    loadComponent: () => import('./view/pages/in-active-use-ingredients-page/in-active-use-ingredients-page.component').then(r => r.InActiveUseIngredientsPageComponent)
  }
]
