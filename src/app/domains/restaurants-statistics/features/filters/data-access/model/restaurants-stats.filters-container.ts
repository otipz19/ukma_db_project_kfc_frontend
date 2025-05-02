import {
  ServerSideFiltersContainer
} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {RestaurantStatistic} from "../../../../../../api/model/restaurantStatistic";
import {RestaurantsStatsSearchFilterModel} from "./restaurants-stats-search.filter-model";

export class RestaurantsStatsFiltersContainer extends ServerSideFiltersContainer<RestaurantStatistic> {
  readonly search = this.addFilterModel(new RestaurantsStatsSearchFilterModel());
}
