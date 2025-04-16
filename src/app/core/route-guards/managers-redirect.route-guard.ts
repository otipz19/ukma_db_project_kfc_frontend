import {CanActivateFn, RedirectCommand, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {EmployeeStoreEntity} from "../../domains/employees/data-access/model/employee-store-entity";

export type managerPropSelector = (manager: EmployeeStoreEntity) => any;

export function managersRedirectRouteGuard(routeParts: Array<string | managerPropSelector>): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const employee = authService.$currentEmployee();
    if (employee == undefined) {
      return new RedirectCommand(router.parseUrl('forbidden'));
    }

    switch (employee.position) {
      case "TOP_MANAGER":
        return true;
      case "MANAGER":
        return new RedirectCommand(router.parseUrl(buildRoute(employee, routeParts)));
      default:
        return new RedirectCommand(router.parseUrl('forbidden'))
    }
  };
}

function buildRoute(manager: EmployeeStoreEntity, routeParts: Array<string | managerPropSelector>): string {
  let result = '';
  for (const part of routeParts) {
    if (typeof part === 'function') {
      result += `/${part(manager)}`;
    } else {
      result += `/${part}`;
    }
  }
  return result;
}
