import {Component, inject} from '@angular/core';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {
  EmployeeCreateFormComponent,
  EmployeeCreateFormResult
} from "../../../../../view/components/create-employee/employee-create-form.component";
import {Employee, EmployeeControllerService, EmployeeHiring, EmployeePosition} from "../../../../../../../api";
import {Restaurant} from "../../../../../../../api/model/restaurant";
import {map, Observable, of, switchMap, tap} from "rxjs";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {UserPhonesControllerService} from "../../../../../../../api/api/userPhonesController.service";
import {EmployeesStore} from "../../../../../data-access/store/employees.store";

@Component({
  selector: 'app-employee-create-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    EmployeeCreateFormComponent
  ],
  templateUrl: './employee-create-dialog.component.html',
  styleUrl: './employee-create-dialog.component.scss'
})
export class EmployeeCreateDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<void>);
  private readonly notify = inject(NotifyService);
  private readonly employeeApi = inject(EmployeeControllerService);
  private readonly phoneApi = inject(UserPhonesControllerService);
  private readonly store = inject(EmployeesStore);

  protected onSubmit(formResult: EmployeeCreateFormResult) {
    const managerIdRequest$ = formResult.position === EmployeePosition.MANAGER
      ? this.requestTopManagerId$()
      : this.requestManagerId$(formResult.restaurantId);

    managerIdRequest$
      .pipe(
        switchMap(managerId => {
          const hiringEmployee: EmployeeHiring = {managerUserId: managerId, ...formResult};
          return this.employeeApi.hireEmployee(hiringEmployee);
        }),
        switchMap(createdUserId => {
          if(formResult.phoneNumber) {
            return this.phoneApi.setUserPhones(createdUserId, [formResult.phoneNumber])
              .pipe(
                map(() => createdUserId)
              );
          }
          return of(createdUserId);
        }),
        this.notify.notifyHttpRequest(),
        tap(createdUserId => {
          this.store.load(createdUserId);
        })
      )
      .subscribe(() => {
        this.dialogRef.close();
      })
  }

  // TODO: Remove when api is updated
  private requestManagerId$(restaurantId: Restaurant['id']): Observable<Employee['userId']> {
    return this.employeeApi.getAllEmployees(restaurantId)
      .pipe(
        map(employees => {
          const managers = employees.filter(e => e.position == EmployeePosition.MANAGER);
          if (managers.length === 0) {
            throw new Error(`No managers in restaurant ${restaurantId} while creating non-manager employee. Shouldn't happen`);
          }
          return managers[0].userId;
        })
      )
  }

  // TODO: Remove when api is updated
  private requestTopManagerId$(): Observable<Employee['userId']> {
    return this.employeeApi.getAllEmployees()
      .pipe(
        map(employees => {
          const managers = employees.filter(e => e.position == EmployeePosition.TOP_MANAGER);
          if (managers.length === 0) {
            throw new Error(`Top manager doesn't exist. Must never happen`);
          }
          return managers[0].userId;
        })
      )
  }

  protected onCancel() {
    this.dialogRef.close();
  }
}
