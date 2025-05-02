import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";

export type RestaurantsStatsTotalOrdersPriceRangeFilterDto = Pick<RestaurantsStatisticFilter, 'minTotalOrdersPrice' | 'maxTotalOrdersPrice'>;

export class RestaurantsStatsTotalOrdersPriceRangeFilterModel extends RangeFilterModel<RestaurantsStatisticFilter, RestaurantsStatsTotalOrdersPriceRangeFilterDto> {

}
