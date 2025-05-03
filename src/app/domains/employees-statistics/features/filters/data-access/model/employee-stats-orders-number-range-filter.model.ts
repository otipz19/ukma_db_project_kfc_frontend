import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {EmployeesStatisticFilter} from "../../../../../../api/model/employeesStatisticFilter";

export type EmployeeStatsOrdersNumberRangeFilterDto = Pick<EmployeesStatisticFilter, 'minNumberOfOrders' | 'maxNumberOfOrders'>;

export class EmployeeStatsOrdersNumberRangeFilterModel extends RangeFilterModel<EmployeesStatisticFilter, EmployeeStatsOrdersNumberRangeFilterDto> {

}
