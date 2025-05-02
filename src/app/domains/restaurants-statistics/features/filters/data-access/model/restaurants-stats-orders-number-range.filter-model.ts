import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";
import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type RestaurantsStatsOrdersNumberRangeFilterDto = Pick<RestaurantsStatisticFilter, 'minNumberOfOrders' | 'maxNumberOfOrders'>;

export class RestaurantsStatsOrdersNumberRangeFilterModel extends RangeFilterModel<RestaurantsStatisticFilter, RestaurantsStatsOrdersNumberRangeFilterDto> {

}
