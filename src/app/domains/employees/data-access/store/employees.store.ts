import {map, Observable} from "rxjs";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {EmployeesFiltersContainer} from "../../features/filters/data-access/model/filters-container/employees-filters-container";
import {EmployeeStoreEntity, mapEmployeeToStoreEntity} from "../model/employee-store-entity";
import {inject, Injectable} from "@angular/core";
import {EmployeeControllerService} from "../../../../api/api/employeeController.service";
import {EmployeesFilter} from "../../../../api/model/employeesFilter";
import {Restaurant} from "../../../../api/model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class EmployeesStore extends BaseEntityStore<EmployeeStoreEntity, EmployeesFilter, EmployeesFiltersContainer> {
  private readonly api = inject(EmployeeControllerService);
  private restaurantId?: Restaurant['id'];

  readonly $viewList = this.$filteredList;

  setRestaurantId(id?: Restaurant['id']) {
    this.restaurantId = id;
  }

  protected override buildFiltersContainer(): EmployeesFiltersContainer {
    return new EmployeesFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<EmployeesFilter>): Observable<EmployeeStoreEntity[]> {
    return this.api.getEmployeesByFilter({restaurantId: this.restaurantId, ...filtersDto})
      .pipe(
        map(list => {
          // Exclude self employee
          this.setTotalItems(list.total);
          return list.items.map(e => mapEmployeeToStoreEntity(e))
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<EmployeeStoreEntity> {
    return this.api.getEmployeeByUserId(id)
      .pipe(
        map(e => mapEmployeeToStoreEntity(e))
      )
  }
}
