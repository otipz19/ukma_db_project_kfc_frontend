import {CanActivateFn, RedirectCommand, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../../../core/services/auth.service";
import {EmployeeControllerService} from "../../../../api";
import {map} from "rxjs";

export const employeesRedirectRouteGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const employeeApi = inject(EmployeeControllerService);

  const user = authService.$currentUser();
  if (user == undefined) {
    return new RedirectCommand(router.parseUrl('forbidden'))
  }

  switch (user.role) {
    case "ADMIN":
      return true;
    case "MANAGER":
      return employeeApi.getEmployeeByUserId(user.id)
        .pipe(
          map(employee => {
            return new RedirectCommand(router.parseUrl(`restaurants/${employee.restaurantId}/employees`));
          })
        );
    default:
      return new RedirectCommand(router.parseUrl('forbidden'))
  }
};
