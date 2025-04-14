import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {EmployeeStoreEntity, mapEmployeeToStoreEntity} from "../../../../data-access/model/employee-store-entity";
import {inject} from "@angular/core";
import {EmployeeControllerService} from "../../../../../../api";
import {catchError, map, of} from "rxjs";

export const UPDATE_EMPLOYEE_RESOLVER_KEY = "UPDATE_EMPLOYEE_RESOLVER_KEY";

export const updateEmployeeResolver: ResolveFn<EmployeeStoreEntity> = (route, state) => {
  const router = inject(Router);

  const employeeId = Number(route.paramMap.get('id'));
  if (isNaN(employeeId)) {
    return new RedirectCommand(router.parseUrl('/not-found'));
  }

  const employeeApi = inject(EmployeeControllerService);

  return employeeApi.getEmployeeByUserId(employeeId)
    .pipe(
      map(employee => mapEmployeeToStoreEntity(employee)),
      catchError(() => {
        return of(new RedirectCommand(router.parseUrl('/not-found')));
      }),
    );
};

