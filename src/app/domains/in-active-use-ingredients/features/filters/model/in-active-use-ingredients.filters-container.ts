import {ServerSideFiltersContainer} from "../../../../../shared/features/filters/model/server-side-filters-container";
import {IngredientsInActiveUseFilter} from "../../../../../api/model/ingredientsInActiveUseFilter";
import {InActiveUseIngredientsDateRangeFilterModel} from "./in-active-use-ingredients-date-range.filter-model";

export class InActiveUseIngredientsFiltersContainer extends ServerSideFiltersContainer<IngredientsInActiveUseFilter> {
  readonly dateRange = this.addFilterModel(new InActiveUseIngredientsDateRangeFilterModel());
}
