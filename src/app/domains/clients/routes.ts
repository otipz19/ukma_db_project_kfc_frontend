import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";
import {CLIENT_RESOLVER_KEY, clientResolver} from "./data-access/resolvers/client.resolver";

export const CLIENTS_ROUTES: Routes = [
  {
    path: 'clients',
    children: [
      {
        path: '',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.MANAGER)],
        loadComponent: () => import('./view/pages/clients-page/clients-page.component').then(r => r.ClientsPageComponent)
      },
      {
        path: ':clientId',
        canActivate: [hasRoleRouteGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.CLIENT)],
        resolve: {[CLIENT_RESOLVER_KEY]: clientResolver},
        loadComponent: () => import('./view/pages/client-profile-page/client-profile-page.component').then(r => r.ClientProfilePageComponent)
      }
    ]
  }
];
