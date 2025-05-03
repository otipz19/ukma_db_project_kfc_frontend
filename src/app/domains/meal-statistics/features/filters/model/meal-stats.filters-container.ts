import {ServerSideFiltersContainer} from "../../../../../shared/features/filters/model/server-side-filters-container";
import {MealStatistic} from "../../../../../api/model/mealStatistic";
import {MealStatsSearchFilterModel} from "./meal-stats-search.filter-model";

export class MealStatsFiltersContainer extends ServerSideFiltersContainer<MealStatistic> {
  readonly search = this.addFilterModel(new MealStatsSearchFilterModel());
}
