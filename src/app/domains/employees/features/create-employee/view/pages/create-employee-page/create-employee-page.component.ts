import {Component, inject, signal} from '@angular/core';
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {UserPhonesControllerService} from "../../../../../../../api/api/userPhonesController.service";
import {map, Observable, of, switchMap} from "rxjs";
import {Restaurant} from "../../../../../../../api/model/restaurant";
import {Location} from "@angular/common";
import {
  EmployeeCreateFormComponent,
  EmployeeCreateFormResult
} from "../../components/create-employee-form/employee-create-form.component";
import {ActivatedRoute} from "@angular/router";
import {RESTAURANT_RESOLVER_KEY} from "../../../../../../restaurants/data-access/resolvers/restaurant.resolver";
import {AuthService} from "../../../../../../../core/services/auth.service";
import {EmployeeControllerService} from "../../../../../../../api/api/employeeController.service";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";
import {EmployeeHiring} from "../../../../../../../api/model/employeeHiring";
import {Employee} from "../../../../../../../api/model/employee";

@Component({
  selector: 'app-create-employee-page',
  imports: [
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
  private readonly authService = inject(AuthService);

  private readonly route = inject(ActivatedRoute);
  protected readonly $restaurant = signal<Restaurant | undefined>(this.route.snapshot.data[RESTAURANT_RESOLVER_KEY]);

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
    // If current user is manager then he is the manager of current restaurant
    // because he only has access to restaurant where he has a role of manager
    const manager = this.authService.$currentEmployee();
    if (manager?.position === 'MANAGER') {
      return of(manager.id);
    }

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
