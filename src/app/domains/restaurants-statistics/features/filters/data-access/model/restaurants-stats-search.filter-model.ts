import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";
import {ServerSideFilterModel} from "../../../../../../shared/features/filters/model/server-side-filter-model";

export class RestaurantsStatsSearchFilterModel implements ServerSideFilterModel<RestaurantsStatisticFilter> {
  private query?: string;

  setQuery(query: string) {
    this.query = query;
  }

  hasFilter(): boolean {
    return this.query != undefined && this.query.trim() != '';
  }

  getFilterDtoPart(): Partial<RestaurantsStatisticFilter> {
    return {address: this.query};
  }

  cleanFilter(): void {
    this.query = undefined;
  }
}
