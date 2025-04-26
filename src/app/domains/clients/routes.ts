import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";

export const CLIENTS_ROUTES: Routes = [
  {
    path: 'clients',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    children: [
      {
        path: '',
        loadComponent: () => import('./view/pages/clients-page/clients-page.component').then(r => r.ClientsPageComponent)
      }
    ]
  }
];
