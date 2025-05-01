import {RestaurantsFilter} from "../../../../api/model/restaurantsFilter";
import {ServerSideFiltersContainer} from "../../../../shared/features/filters/model/server-side-filters-container";
import {SearchRestaurantFilterModel} from "./search-restaurant.filter-model";

export class RestaurantsFiltersContainer extends ServerSideFiltersContainer<RestaurantsFilter> {
  readonly query = this.addFilterModel(new SearchRestaurantFilterModel());
}
