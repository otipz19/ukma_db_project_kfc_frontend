import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {RestaurantsFiltersContainer} from "../filters/filters-container/restaurants-filters-container";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Restaurant} from "../../../../api/model/restaurant";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsStore extends BaseEntityStore<Restaurant, RestaurantsFiltersContainer> {
  private readonly api = inject(RestaurantControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): RestaurantsFiltersContainer {
    return new RestaurantsFiltersContainer();
  }

  protected override getAllFromApi(): Observable<Restaurant[]> {
    return this.api.getRestaurantsByFilter()
      .pipe(
        map(list => {
          return list.items;
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<Restaurant> {
    return this.api.getRestaurantById(id);
  }
}
