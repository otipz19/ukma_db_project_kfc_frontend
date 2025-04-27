import {inject, Injectable, signal} from "@angular/core";
import {catchError, EMPTY, map, Observable, tap} from "rxjs";
import {EmployeeControllerService} from "../../../../api/api/employeeController.service";
import {EmployeeStoreEntity, mapEmployeeToStoreEntity} from "../model/employee-store-entity";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {Restaurant} from "../../../../api/model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileStore {
  private readonly api = inject(EmployeeControllerService);
  private readonly restaurantApi = inject(RestaurantControllerService);

  private readonly $employeeInner = signal<EmployeeStoreEntity | undefined>(undefined);
  readonly $employee = this.$employeeInner.asReadonly();
  private readonly $restaurantInner = signal<Restaurant | undefined>(undefined);
  readonly $restaurant = this.$restaurantInner.asReadonly();

  reloadData() {
    const id = this.$employeeInner()?.id;
    if (!id) {
      return;
    }
    this.request(id).subscribe();
  }

  load(employee: EmployeeStoreEntity) {
    this.$employeeInner.set(employee);
    if(employee.restaurantId) {
      this.restaurantApi.getRestaurantById(employee.restaurantId)
        .subscribe(restaurant => {
          this.$restaurantInner.set(restaurant);
        });
    }
  }

  private request(id: EmployeeStoreEntity['id']): Observable<EmployeeStoreEntity> {
    return this.api.getEmployeeByUserId(id)
      .pipe(
        catchError(() => {
          this.$employeeInner.set(undefined);
          return EMPTY;
        }),
        map(employee => mapEmployeeToStoreEntity(employee)),
        tap(employee => {
          this.$employeeInner.set(employee);
        })
      );
  }
}
