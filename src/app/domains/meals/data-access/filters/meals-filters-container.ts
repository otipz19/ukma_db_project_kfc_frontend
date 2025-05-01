import {ServerSideFiltersContainer} from "../../../../shared/features/filters/model/server-side-filters-container";
import {MealsFilter} from "../../../../api/model/mealsFilter";
import {SearchMealsFilterModel} from "./search-meals.filter-model";
import {MealsPriceRangeFilterModel} from "./meals-price-range.filter-model";
import {MealsWeightRangeFilterModel} from "./meals-weight-range.filter-model";
import {MealsEnergeticValueRangeFilterModel} from "./meals-energetic-value-range.filter-model";
import {MealsAdditionalPriceRangeFilterModel} from "./meals-additional-price-range.filter-model";

export class MealsFiltersContainer extends ServerSideFiltersContainer<MealsFilter> {
  readonly search = this.addFilterModel(new SearchMealsFilterModel());
  readonly priceRange = this.addFilterModel(new MealsPriceRangeFilterModel());
  readonly additionalPriceRange = this.addFilterModel(new MealsAdditionalPriceRangeFilterModel());
  readonly weightRange = this.addFilterModel(new MealsWeightRangeFilterModel());
  readonly energeticValueRange = this.addFilterModel(new MealsEnergeticValueRangeFilterModel());
}
