import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {MealsStatisticFilter} from "../../../../../../api/model/mealsStatisticFilter";

export type MealStatsClientMealsRangeFilterDto = Pick<MealsStatisticFilter, 'minClientMealsCount' | 'maxClientMealsCount'>;

export class MealStatsClientMealsRangeFilterModel extends RangeFilterModel<MealsStatisticFilter, MealStatsClientMealsRangeFilterDto> {

}
