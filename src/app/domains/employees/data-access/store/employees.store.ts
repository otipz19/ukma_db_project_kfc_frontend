import {map, Observable} from "rxjs";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {EmployeesFiltersContainer} from "../filters/filters-container/employees-filters-container";
import {EmployeeStoreEntity, mapEmployeeToStoreEntity} from "../model/employee-store-entity";
import {inject, Injectable} from "@angular/core";
import {EmployeeControllerService} from "../../../../api";

@Injectable({
  providedIn: 'root'
})
export class EmployeesStore extends BaseEntityStore<EmployeeStoreEntity, EmployeesFiltersContainer> {
  private readonly api = inject(EmployeeControllerService);

  protected override buildFiltersContainer(): EmployeesFiltersContainer {
    return new EmployeesFiltersContainer();
  }

  protected override getAllFromApi(): Observable<EmployeeStoreEntity[]> {
    return this.api.getAllEmployees()
      .pipe(
        map(list => list.map(e => mapEmployeeToStoreEntity(e)))
      );
  }

  protected override getByIdFromApi(id: number): Observable<EmployeeStoreEntity> {
    return this.api.getEmployeeByUserId(id)
      .pipe(
        map(e => mapEmployeeToStoreEntity(e))
      )
  }
}
