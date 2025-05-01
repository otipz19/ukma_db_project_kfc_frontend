import {RangeFilterModel} from "../../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {EmployeesFilter} from "../../../../../../../api/model/employeesFilter";

export type EmployeeSalaryRangeFilterDto = Pick<EmployeesFilter, 'minSalary' | 'maxSalary'>;

export class EmployeeSalaryRangeFilterModel extends RangeFilterModel<EmployeesFilter, EmployeeSalaryRangeFilterDto> {

}
