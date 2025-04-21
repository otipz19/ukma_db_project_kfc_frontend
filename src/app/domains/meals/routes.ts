import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const MEALS_ROUTES: Routes = [
  {
    path: 'meals',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    children: [
      {
        path: '',
        loadComponent: () => import('./view/pages/meals-page/meals-page.component').then(r => r.MealsPageComponent)
      }
    ]
  }
];
