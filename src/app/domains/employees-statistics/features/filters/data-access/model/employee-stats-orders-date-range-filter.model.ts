import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {EmployeesStatisticFilter} from "../../../../../../api/model/employeesStatisticFilter";

export type EmployeeStatsOrdersDateRangeFilterDto = Pick<EmployeesStatisticFilter, 'fromDate' | 'toDate'>;

export class EmployeeStatsOrdersDateRangeFilterModel extends RangeFilterModel<EmployeesStatisticFilter, EmployeeStatsOrdersDateRangeFilterDto> {

}
