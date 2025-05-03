import {ServerSideFiltersContainer} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {MealStatistic} from "../../../../../../api/model/mealStatistic";
import {MealStatsSearchFilterModel} from "./meal-stats-search.filter-model";
import {MealStatsClientMealsRangeFilterModel} from "./meal-stats-client-meals-range.filter-model";
import {MealStatsLastOrderedRangeFilterModel} from "./meal-stats-last-ordered-range.filter-model";
import {MealStatsStatusFilterModel} from "./meal-stats-status-filter.model";

export class MealStatsFiltersContainer extends ServerSideFiltersContainer<MealStatistic> {
  readonly search = this.addFilterModel(new MealStatsSearchFilterModel());
  readonly clientMeals = this.addFilterModel(new MealStatsClientMealsRangeFilterModel());
  readonly lastOrdered = this.addFilterModel(new MealStatsLastOrderedRangeFilterModel());
  readonly actual = this.addFilterModel(new MealStatsStatusFilterModel());
}
