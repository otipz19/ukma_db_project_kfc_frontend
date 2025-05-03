import {RangeFilterModel} from "../../../../../shared/features/filters/generic-filters/range-filter-model";
import {IngredientsInActiveUseFilter} from "../../../../../api/model/ingredientsInActiveUseFilter";

export type InActiveUseIngredientsDateRangeFilterDto = Pick<IngredientsInActiveUseFilter, 'fromDate' | 'toDate'>;

export class InActiveUseIngredientsDateRangeFilterModel extends RangeFilterModel<IngredientsInActiveUseFilter, InActiveUseIngredientsDateRangeFilterDto> {

}
