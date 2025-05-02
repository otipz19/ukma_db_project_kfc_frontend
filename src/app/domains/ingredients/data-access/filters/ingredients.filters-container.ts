import {ServerSideFiltersContainer} from "../../../../shared/features/filters/model/server-side-filters-container";
import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";
import {SearchIngredientsFilterModel} from "./search-ingredients.filter-model";
import {IngredientsPriceRangeFilterModel} from "./ingredients-price-range.filter-model";
import {IngredientsWeightRangeFilterModel} from "./ingredients-weight-range.filter-model";
import {IngredientsEnergeticValueRangeFilterModel} from "./ingredients-energetic-value-range.filter-model";
import {IngredientsExcludeFilterModel} from "./ingredients-exclude.filter-model";

export class IngredientsFiltersContainer extends ServerSideFiltersContainer<IngredientsFilter> {
  readonly search = this.addFilterModel(new SearchIngredientsFilterModel());
  readonly priceRange = this.addFilterModel(new IngredientsPriceRangeFilterModel());
  readonly weightRange = this.addFilterModel(new IngredientsWeightRangeFilterModel());
  readonly energeticValueRange = this.addFilterModel(new IngredientsEnergeticValueRangeFilterModel());
  readonly exclude = this.addFilterModel(new IngredientsExcludeFilterModel());
}
