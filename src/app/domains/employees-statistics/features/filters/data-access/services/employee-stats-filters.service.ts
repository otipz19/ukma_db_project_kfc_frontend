import {inject, Injectable} from "@angular/core";
import {
  BaseRangeStatsFilterService
} from "../../../../../../shared/features/filters/services/base-range-stats-filter.service";
import {EmployeeStatistic} from "../../../../../../api/model/employeeStatistic";
import {EmployeesStatisticFilter} from "../../../../../../api/model/employeesStatisticFilter";
import {EmployeeStatsFiltersContainer} from "../model/employee-stats.filters-container";
import {EmployeeStatsStore} from "../../../../data-access/store/employee-stats.store";
import {
  EmployeeStatsOrderNumberRangeFilterFormComponent
} from "../../view/components/employee-stats-orders-number-range-filter-form/employee-stats-order-number-range-filter-form.component";
import {
  EmployeeStatsTotalOrdersPriceRangeFilterFormComponent
} from "../../view/components/restaurants-stats-total-orders-price-range-filter-form/employee-stats-total-orders-price-range-filter-form.component";
import {
  EmployeeStatsOrdersDateRangeFilterFormComponent
} from "../../view/components/employee-stats-orders-date-range-filter-form/employee-stats-orders-date-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatsFiltersService extends BaseRangeStatsFilterService<EmployeeStatistic, EmployeesStatisticFilter, EmployeeStatsFiltersContainer, EmployeeStatsStore> {
  protected override readonly store = inject(EmployeeStatsStore);

  openOrdersNumber() {
    this.openRangeForm({
      title: 'Оберіть діапазон кількості замовлень',
      filter: this.store.filters.ordersNumber,
      formComponent: EmployeeStatsOrderNumberRangeFilterFormComponent
    });
  }

  openTotalOrdersPrice() {
    this.openRangeForm({
      title: 'Оберіть діапазон сумарної вартості замовлень',
      filter: this.store.filters.totalOrdersPrice,
      formComponent: EmployeeStatsTotalOrdersPriceRangeFilterFormComponent
    });
  }

  openOrdersDate() {
    this.openRangeForm({
      title: 'Оберіть діапазон дати створення замовлень',
      filter: this.store.filters.ordersDate,
      formComponent: EmployeeStatsOrdersDateRangeFilterFormComponent
    });
  }
}
