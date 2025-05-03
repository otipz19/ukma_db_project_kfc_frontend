import {ServerSideFiltersContainer} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {ValuableIngredientsFilter} from "../../../../../../api/model/valuableIngredientsFilter";
import {IngredientsMinMealPriceFilterModel} from "./ingredients-min-meal-price.filter-model";

export class ValuableIngredientsFiltersContainer extends ServerSideFiltersContainer<ValuableIngredientsFilter> {
  readonly minMealPrice = this.addFilterModel(new IngredientsMinMealPriceFilterModel());
}
