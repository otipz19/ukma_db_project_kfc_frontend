import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {RestaurantsFiltersContainer} from "../filters/filters-container/restaurants-filters-container";
import { Observable } from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Restaurant} from "../../../../api/model/restaurant";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsStore extends BaseEntityStore<Restaurant, RestaurantsFiltersContainer> {
  private readonly api = inject(RestaurantControllerService);

  protected override buildFiltersContainer(): RestaurantsFiltersContainer {
    return new RestaurantsFiltersContainer();
  }

  protected override getAllFromApi(): Observable<Restaurant[]> {
    return this.api.getAllRestaurants();
  }

  protected override getByIdFromApi(id: number): Observable<Restaurant> {
    return this.api.getRestaurantById(id);
  }
}
