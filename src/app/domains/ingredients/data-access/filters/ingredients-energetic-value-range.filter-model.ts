import {RangeFilterModel} from "../../../../shared/features/filters/generic-filters/range-filter-model";
import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";

export type IngredientsEnergeticValueRangeFilterDto = Pick<IngredientsFilter, 'minEnergeticValue' | 'maxEnergeticValue'>;

export class IngredientsEnergeticValueRangeFilterModel extends RangeFilterModel<IngredientsFilter, IngredientsEnergeticValueRangeFilterDto> {

}
