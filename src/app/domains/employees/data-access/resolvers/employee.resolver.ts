import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {EmployeeStoreEntity, mapEmployeeToStoreEntity} from "../model/employee-store-entity";
import {inject} from "@angular/core";
import {catchError, EMPTY, map, tap} from "rxjs";
import {EmployeeControllerService} from "../../../../api/api/employeeController.service";
import {EmployeePosition} from "../../../../api/model/employeePosition";
import {HttpErrorResponse} from "@angular/common/http";

export const EMPLOYEE_RESOLVER_KEY = "EMPLOYEE_RESOLVER_KEY";

export const employeeResolver: ResolveFn<EmployeeStoreEntity> = (route, state) => {
  const router = inject(Router);

  const employeeId = Number(route.paramMap.get('employeeId'));
  if (isNaN(employeeId)) {
    return new RedirectCommand(router.parseUrl('not-found'));
  }

  const api = inject(EmployeeControllerService);
  return api.getEmployeeByUserId(employeeId)
    .pipe(
      map(employee => {
        return mapEmployeeToStoreEntity(employee)
      }),
      tap(employee => {
        if (employee.position === EmployeePosition.TOP_MANAGER) {
          router.navigate(['forbidden']);
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          router.navigate(['forbidden']);
        }
        router.navigate(['not-found']);
        return EMPTY;
      })
    );
};

