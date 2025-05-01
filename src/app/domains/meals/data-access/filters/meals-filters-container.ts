import {ServerSideFiltersContainer} from "../../../../shared/features/filters/model/server-side-filters-container";
import {MealsFilter} from "../../../../api/model/mealsFilter";
import {SearchMealsFilterModel} from "./search-meals.filter-model";

export class MealsFiltersContainer extends ServerSideFiltersContainer<MealsFilter> {
  readonly search = this.addFilterModel(new SearchMealsFilterModel());
}
