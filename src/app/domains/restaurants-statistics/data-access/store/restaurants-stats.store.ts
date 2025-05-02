import {RestaurantStatistic} from "../../../../api/model/restaurantStatistic";
import {RestaurantsStatisticFilter} from "../../../../api/model/restaurantsStatisticFilter";
import {
  RestaurantsStatsFiltersContainer
} from "../../features/filters/data-access/model/restaurants-stats.filters-container";
import {map, Observable} from "rxjs";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {inject, Injectable} from "@angular/core";
import {BaseStatsStore} from "../../../../shared/store/base-stats-store";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsStatsStore extends BaseStatsStore<RestaurantStatistic, RestaurantsStatisticFilter, RestaurantsStatsFiltersContainer> {
  private api = inject(RestaurantControllerService);

  protected override buildFiltersContainer(): RestaurantsStatsFiltersContainer {
    return new RestaurantsStatsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<RestaurantsStatisticFilter>): Observable<RestaurantStatistic[]> {
    return this.api.getRestaurantsStatisticByFilter(filterDto)
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items;
        })
      );
  }
}
