import {map, Observable} from "rxjs";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {EmployeesFiltersContainer} from "../filters/filters-container/employees-filters-container";
import {EmployeeStoreEntity, mapEmployeeToStoreEntity} from "../model/employee-store-entity";
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../../../../core/services/auth.service";
import {EmployeeControllerService} from "../../../../api/api/employeeController.service";
import {EmployeesFilter} from "../../../../api/model/employeesFilter";

@Injectable({
  providedIn: 'root'
})
export class EmployeesStore extends BaseEntityStore<EmployeeStoreEntity, EmployeesFilter, EmployeesFiltersContainer> {
  private readonly api = inject(EmployeeControllerService);
  private readonly authService = inject(AuthService);

  // readonly $viewList = computed(() => {
  //   return this.$filteredList().filter(e => e.id !== this.authService.$currentUser()?.id);
  // });
  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): EmployeesFiltersContainer {
    return new EmployeesFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<EmployeesFilter>): Observable<EmployeeStoreEntity[]> {
    return this.api.getEmployeesByFilter({...filtersDto})
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
