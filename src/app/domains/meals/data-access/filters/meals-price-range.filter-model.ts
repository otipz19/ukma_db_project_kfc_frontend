import {MealsFilter} from "../../../../api/model/mealsFilter";
import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";

export type MealsPriceRangeFilterDto = Pick<MealsFilter, 'minPrice' | 'maxPrice'>;

export class MealsPriceRangeFilterModel extends RangeFilterModel<MealsFilter, MealsPriceRangeFilterDto> {

}
