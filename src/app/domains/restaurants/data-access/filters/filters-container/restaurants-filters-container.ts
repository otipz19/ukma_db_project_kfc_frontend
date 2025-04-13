import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {RestaurantsSearchFilterModel} from "../filter-models/restaurants-search-filter-model";
import {Restaurant} from "../../../../../api/model/restaurant";

export class RestaurantsFiltersContainer extends FiltersContainer<Restaurant> {
  readonly addressFilter = this.addFilterModel(new RestaurantsSearchFilterModel());
}
