import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {Restaurant} from "../../../../../api";
import {RestaurantsSearchFilterModel} from "../filter-models/restaurants-search-filter-model";

export class RestaurantsFiltersContainer extends FiltersContainer<Restaurant> {
  readonly addressFilter = this.addFilterModel(new RestaurantsSearchFilterModel());
}
