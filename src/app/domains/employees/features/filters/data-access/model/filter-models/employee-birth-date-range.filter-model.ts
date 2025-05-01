import {EmployeesFilter} from "../../../../../../../api/model/employeesFilter";
import {RangeFilterModel} from "../../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type EmployeeBirthDateRangeFilterDto = Pick<EmployeesFilter, 'minBirthDate' | 'maxBirthDate'>;

export class EmployeeBirthDateRangeFilterModel extends RangeFilterModel<EmployeesFilter, EmployeeBirthDateRangeFilterDto> {

}
