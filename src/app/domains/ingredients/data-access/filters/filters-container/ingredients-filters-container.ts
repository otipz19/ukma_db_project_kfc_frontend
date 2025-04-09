import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {Ingredient} from "../../../../../api/model/ingredient";
import {IngredientSearchFilterModel} from "../filter-models/ingredient-search-filter-model";

export class IngredientsFiltersContainer extends FiltersContainer<Ingredient> {
  readonly titleFilter = this.addFilterModel(new IngredientSearchFilterModel());
}
