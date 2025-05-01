import {EmployeeSearchFilterModel} from "../filter-models/employee-search-filter-model";
import {ServerSideFiltersContainer} from "../../../../../shared/features/filters/model/server-side-filters-container";
import {EmployeesFilter} from "../../../../../api/model/employeesFilter";

export class EmployeesFiltersContainer extends ServerSideFiltersContainer<EmployeesFilter> {
  readonly searchFilter = this.addFilterModel(new EmployeeSearchFilterModel());
}
