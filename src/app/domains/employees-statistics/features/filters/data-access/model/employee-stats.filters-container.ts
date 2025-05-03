import {
  ServerSideFiltersContainer
} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {EmployeeStatistic} from "../../../../../../api/model/employeeStatistic";
import {EmployeeStatsSearchFilterModel} from "./employee-stats-search.filter-model";

export class EmployeeStatsFiltersContainer extends ServerSideFiltersContainer<EmployeeStatistic> {
  readonly search = this.addFilterModel(new EmployeeStatsSearchFilterModel());
}
