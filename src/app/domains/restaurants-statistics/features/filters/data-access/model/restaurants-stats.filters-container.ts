import {
  ServerSideFiltersContainer
} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {RestaurantStatistic} from "../../../../../../api/model/restaurantStatistic";
import {RestaurantsStatsSearchFilterModel} from "./restaurants-stats-search.filter-model";
import {RestaurantsStatsOrdersNumberRangeFilterModel} from "./restaurants-stats-orders-number-range.filter-model";
import {
  RestaurantsStatsTotalOrdersPriceRangeFilterModel
} from "./restaurants-stats-total-orders-price-range-filter.model";
import {RestaurantsStatsOrdersDateRangeFilterModel} from "./restaurants-stats-orders-date-range-filter.model";

export class RestaurantsStatsFiltersContainer extends ServerSideFiltersContainer<RestaurantStatistic> {
  readonly search = this.addFilterModel(new RestaurantsStatsSearchFilterModel());
  readonly ordersNumber = this.addFilterModel(new RestaurantsStatsOrdersNumberRangeFilterModel());
  readonly totalOrdersPrice = this.addFilterModel(new RestaurantsStatsTotalOrdersPriceRangeFilterModel());
  readonly ordersDate = this.addFilterModel(new RestaurantsStatsOrdersDateRangeFilterModel());
}
