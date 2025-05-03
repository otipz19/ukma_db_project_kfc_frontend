import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {EmployeesStatisticFilter} from "../../../../../../api/model/employeesStatisticFilter";

export type EmployeeStatsTotalOrdersPriceRangeFilterDto = Pick<EmployeesStatisticFilter, 'minTotalOrdersPrice' | 'maxTotalOrdersPrice'>;

export class EmployeeStatsTotalOrdersPriceRangeFilterModel extends RangeFilterModel<EmployeesStatisticFilter, EmployeeStatsTotalOrdersPriceRangeFilterDto> {

}
