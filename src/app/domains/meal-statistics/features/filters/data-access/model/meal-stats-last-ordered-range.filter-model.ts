import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {MealsStatisticFilter} from "../../../../../../api/model/mealsStatisticFilter";

export type MealStatsLastOrderedRangeFilterDto = Pick<MealsStatisticFilter, 'minLastOrderedDate' | 'maxLastOrderedDate'>;

export class MealStatsLastOrderedRangeFilterModel extends RangeFilterModel<MealsStatisticFilter, MealStatsLastOrderedRangeFilterDto> {

}
