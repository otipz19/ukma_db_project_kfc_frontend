import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Restaurant} from "../../../../api/model/restaurant";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {RestaurantsFilter} from "../../../../api/model/restaurantsFilter";
import {RestaurantsFiltersContainer} from "../filters/restaurants.filters-container";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsStore extends BaseEntityStore<Restaurant, RestaurantsFilter, RestaurantsFiltersContainer> {
  private readonly api = inject(RestaurantControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): RestaurantsFiltersContainer {
    return new RestaurantsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<RestaurantsFilter>): Observable<Restaurant[]> {
    return this.api.getRestaurantsByFilter({isDeleted: false, ...filterDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items;
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<Restaurant> {
    return this.api.getRestaurantById(id);
  }
}
