import {BaseStatsStore} from "../../../../shared/store/base-stats-store";
import {EmployeeStatistic} from "../../../../api/model/employeeStatistic";
import {EmployeesStatisticFilter} from "../../../../api/model/employeesStatisticFilter";
import {EmployeeStatsFiltersContainer} from "../../features/filters/data-access/model/employee-stats.filters-container";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {EmployeeControllerService} from "../../../../api/api/employeeController.service";
import {Restaurant} from "../../../../api/model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatsStore extends BaseStatsStore<EmployeeStatistic, EmployeesStatisticFilter, EmployeeStatsFiltersContainer> {
  private api = inject(EmployeeControllerService);
  private restaurantId?: Restaurant['id'];

  setRestaurantId(id?: Restaurant['id']) {
    this.restaurantId = id;
  }

  protected override buildFiltersContainer(): EmployeeStatsFiltersContainer {
    return new EmployeeStatsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<EmployeesStatisticFilter>): Observable<EmployeeStatistic[]> {
    return this.api.getEmployeesStatisticByFilter({restaurantId: this.restaurantId, ...filterDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items;
        })
      );
  }
}
