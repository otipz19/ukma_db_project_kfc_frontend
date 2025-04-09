import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {Ingredient} from "../../../../../api/model/ingredient";
import {TitleFilterModel} from "../filter-models/title-filter-model";

export class IngredientsFiltersContainer extends FiltersContainer<Ingredient> {
  readonly titleFilter = this.addFilterModel(new TitleFilterModel());
}
