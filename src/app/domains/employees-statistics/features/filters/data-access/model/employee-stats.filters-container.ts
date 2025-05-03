import {
  ServerSideFiltersContainer
} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {EmployeeStatistic} from "../../../../../../api/model/employeeStatistic";
import {EmployeeStatsSearchFilterModel} from "./employee-stats-search.filter-model";
import {EmployeeStatsOrdersDateRangeFilterModel} from "./employee-stats-orders-date-range-filter.model";
import {EmployeeStatsTotalOrdersPriceRangeFilterModel} from "./employee-stats-total-orders-price-range-filter.model";
import {EmployeeStatsOrdersNumberRangeFilterModel} from "./employee-stats-orders-number-range-filter.model";

export class EmployeeStatsFiltersContainer extends ServerSideFiltersContainer<EmployeeStatistic> {
  readonly search = this.addFilterModel(new EmployeeStatsSearchFilterModel());
  readonly ordersDate = this.addFilterModel(new EmployeeStatsOrdersDateRangeFilterModel());
  readonly totalOrdersPrice = this.addFilterModel(new EmployeeStatsTotalOrdersPriceRangeFilterModel());
  readonly ordersNumber = this.addFilterModel(new EmployeeStatsOrdersNumberRangeFilterModel());
}
