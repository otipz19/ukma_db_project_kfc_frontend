import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";
import {MealsFilter} from "../../../../api/model/mealsFilter";

export type MealsEnergeticValueRangeFilterDto = Pick<MealsFilter, 'minEnergeticValue' | 'maxEnergeticValue'>;

export class MealsEnergeticValueRangeFilterModel extends RangeFilterModel<MealsFilter, MealsEnergeticValueRangeFilterDto> {

}
