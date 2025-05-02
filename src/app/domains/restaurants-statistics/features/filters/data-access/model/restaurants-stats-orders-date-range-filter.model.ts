import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";
import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type RestaurantsStatsOrdersDateRangeFilterDto = Pick<RestaurantsStatisticFilter, 'fromDate' | 'toDate'>;

export class RestaurantsStatsOrdersDateRangeFilterModel extends RangeFilterModel<RestaurantsStatisticFilter, RestaurantsStatsOrdersDateRangeFilterDto> {

}
