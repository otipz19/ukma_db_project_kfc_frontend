import {MealsFilter} from "../../../../api/model/mealsFilter";
import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";

export type MealsAdditionalPriceRangeFilterDto = Pick<MealsFilter, 'minAdditionalPrice' | 'maxAdditionalPrice'>;

export class MealsAdditionalPriceRangeFilterModel extends RangeFilterModel<MealsFilter, MealsAdditionalPriceRangeFilterDto> {

}
