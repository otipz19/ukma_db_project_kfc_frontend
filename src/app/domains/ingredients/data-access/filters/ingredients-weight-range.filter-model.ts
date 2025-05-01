import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";
import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";

export type IngredientsWeightRangeFilterDto = Pick<IngredientsFilter, 'minWeight' | 'maxWeight'>;

export class IngredientsWeightRangeFilterModel extends RangeFilterModel<IngredientsFilter, IngredientsWeightRangeFilterDto> {

}
