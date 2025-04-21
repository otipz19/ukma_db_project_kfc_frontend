import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {Meal} from "../../../../../api/model/meal";
import {SearchMealFilterModel} from "../filter-models/search-meal.filter-model";

export class MealsFiltersContainer extends FiltersContainer<Meal> {
  readonly search = this.addFilterModel(new SearchMealFilterModel());
}
