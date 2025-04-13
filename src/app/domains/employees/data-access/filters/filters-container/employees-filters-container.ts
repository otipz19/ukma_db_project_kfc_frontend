import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {EmployeeSearchFilterModel} from "../filter-models/employee-search-filter-model";
import {EmployeeStoreEntity} from "../../model/employee-store-entity";

export class EmployeesFiltersContainer extends FiltersContainer<EmployeeStoreEntity> {
  readonly searchFilter = this.addFilterModel(new EmployeeSearchFilterModel());
}
