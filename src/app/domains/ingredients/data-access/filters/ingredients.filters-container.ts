import {ServerSideFiltersContainer} from "../../../../shared/features/filters/model/server-side-filters-container";
import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";
import {SearchIngredientsFilterModel} from "./search-ingredients.filter-model";

export class IngredientsFiltersContainer extends ServerSideFiltersContainer<IngredientsFilter> {
  readonly search = this.addFilterModel(new SearchIngredientsFilterModel());
}
