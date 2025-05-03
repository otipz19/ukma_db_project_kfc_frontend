import {ServerSideFilterModel} from "../../../../../shared/features/filters/model/server-side-filter-model";
import {MealsStatisticFilter} from "../../../../../api/model/mealsStatisticFilter";

export class MealStatsSearchFilterModel implements ServerSideFilterModel<MealsStatisticFilter> {
  private query?: string;

  setQuery(query: string) {
    this.query = query;
  }

  hasFilter(): boolean {
    return this.query != undefined && this.query.trim() != '';
  }

  getFilterDtoPart(): Partial<MealsStatisticFilter> {
    return {title: this.query};
  }

  cleanFilter(): void {
    this.query = undefined;
  }
}
