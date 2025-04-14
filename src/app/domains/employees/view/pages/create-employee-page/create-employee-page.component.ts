import {Component, inject} from '@angular/core';
import {MatDialogTitle} from "@angular/material/dialog";
import {
  EmployeeCreateFormComponent,
  EmployeeCreateFormResult
} from "../../components/create-employee/employee-create-form.component";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {Employee, EmployeeControllerService, EmployeeHiring, EmployeePosition} from "../../../../../api";
import {UserPhonesControllerService} from "../../../../../api/api/userPhonesController.service";
import {map, Observable, of, switchMap} from "rxjs";
import {Restaurant} from "../../../../../api/model/restaurant";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-employee-page',
  imports: [
    MatDialogTitle,
    EmployeeCreateFormComponent
  ],
  templateUrl: './create-employee-page.component.html',
  styleUrl: './create-employee-page.component.scss'
})
export class CreateEmployeePageComponent {
  private readonly location = inject(Location);
  private readonly notify = inject(NotifyService);
  private readonly employeeApi = inject(EmployeeControllerService);
  private readonly phoneApi = inject(UserPhonesControllerService);

  protected onSubmit(formResult: EmployeeCreateFormResult) {
    const managerIdRequest$ = formResult.position === EmployeePosition.MANAGER
      ? this.requestTopManagerId$()
      : this.requestManagerId$(formResult.restaurantId);

    const {phoneNumber, ...restFormResult} = formResult;

    managerIdRequest$
      .pipe(
        switchMap(managerId => {
          const hiringEmployee: EmployeeHiring = {managerUserId: managerId, ...restFormResult};
          return this.employeeApi.hireEmployee(hiringEmployee);
        }),
        switchMap(createdUserId => {
          if(phoneNumber) {
            return this.phoneApi.setUserPhones(createdUserId, [phoneNumber])
              .pipe(
                map(() => createdUserId)
              );
          }
          return of(createdUserId);
        }),
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.location.back();
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
    this.location.back();
  }
}
