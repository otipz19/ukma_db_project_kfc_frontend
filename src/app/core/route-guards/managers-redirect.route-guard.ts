import {CanActivateFn, RedirectCommand, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserRole} from "../../api";

export type EntityPropSelector = (entity: any) => any;

export type RouteParts = Array<string | EntityPropSelector>

export type RoutePartsMappers = Array<[UserRole, RouteParts]>;

export function managersRedirectRouteGuard(routeParts: Array<string | EntityPropSelector>): CanActivateFn {
  return roleRedirectRouteGuard([[UserRole.MANAGER, routeParts]]);
}

export function roleRedirectRouteGuard(mappers: RoutePartsMappers): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.$currentUser();
    if (user == undefined) {
      return forbidden();
    }

    const employee = authService.$currentEmployee();
    const client = authService.$currentClient();

    if(user.role === UserRole.ADMIN) {
      return true;
    }

    const routeParts = findRouteParts(user.role, mappers);
    if(routeParts == undefined) {
      return forbidden();
    }

    if(user.role === UserRole.CLIENT) {
      return new RedirectCommand(router.parseUrl(buildRoute(client!, routeParts)));
    }

    return new RedirectCommand(router.parseUrl(buildRoute(employee!, routeParts)));
  };
}

function forbidden() {
  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('forbidden'));
}

function findRouteParts(role: UserRole, mappers: RoutePartsMappers): RouteParts | undefined {
  return mappers.find(mapper => mapper[0] === role)?.[1];
}

function buildRoute(entity: any, routeParts: Array<string | EntityPropSelector>): string {
  let result = '';
  for (const part of routeParts) {
    if (typeof part === 'function') {
      result += `/${part(entity)}`;
    } else {
      result += `/${part}`;
    }
  }
  return result;
}
