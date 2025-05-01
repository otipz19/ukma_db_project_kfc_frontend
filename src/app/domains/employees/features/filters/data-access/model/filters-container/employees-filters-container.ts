import {EmployeeSearchFilterModel} from "../filter-models/employee-search-filter-model";
import {ServerSideFiltersContainer} from "../../../../../../../shared/features/filters/model/server-side-filters-container";
import {EmployeesFilter} from "../../../../../../../api/model/employeesFilter";
import {EmployeePositionsFilterModel} from "../filter-models/employee-positions.filter-model";
import {EmployeeSalaryRangeFilterModel} from "../filter-models/employee-salary-range.filter-model";
import {EmployeeBirthDateRangeFilterModel} from "../filter-models/employee-birth-date-range.filter-model";

export class EmployeesFiltersContainer extends ServerSideFiltersContainer<EmployeesFilter> {
  readonly searchFilter = this.addFilterModel(new EmployeeSearchFilterModel());
  readonly positions = this.addFilterModel(new EmployeePositionsFilterModel());
  readonly salary = this.addFilterModel(new EmployeeSalaryRangeFilterModel());
  readonly birthDate = this.addFilterModel(new EmployeeBirthDateRangeFilterModel());
}
