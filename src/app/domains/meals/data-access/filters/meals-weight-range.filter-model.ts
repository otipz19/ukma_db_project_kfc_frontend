import {MealsFilter} from "../../../../api/model/mealsFilter";
import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";

export type MealsWeightRangeFilterDto = Pick<MealsFilter, 'minWeight' | 'maxWeight'>;

export class MealsWeightRangeFilterModel extends RangeFilterModel<MealsFilter, MealsWeightRangeFilterDto> {

}
