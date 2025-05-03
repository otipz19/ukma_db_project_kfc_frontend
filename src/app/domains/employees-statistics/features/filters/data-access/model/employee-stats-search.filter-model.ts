import {EmployeesStatisticFilter} from "../../../../../../api/model/employeesStatisticFilter";
import {ServerSideFilterModel} from "../../../../../../shared/features/filters/model/server-side-filter-model";

export class EmployeeStatsSearchFilterModel implements ServerSideFilterModel<EmployeesStatisticFilter> {
  private query?: string;

  setQuery(query: string) {
    this.query = query;
  }

  hasFilter(): boolean {
    return this.query != undefined && this.query.trim() != '';
  }

  getFilterDtoPart(): Partial<EmployeesStatisticFilter> {
    return {passportNumber: this.query};
  }

  cleanFilter(): void {
    this.query = undefined;
  }
}
