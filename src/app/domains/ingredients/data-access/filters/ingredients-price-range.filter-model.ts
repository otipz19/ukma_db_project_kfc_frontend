import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";
import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";

export type IngredientsPriceRangeFilterDto = Pick<IngredientsFilter, 'minPrice' | 'maxPrice'>;

export class IngredientsPriceRangeFilterModel extends RangeFilterModel<IngredientsFilter, IngredientsPriceRangeFilterDto> {

}
