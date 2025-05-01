import {BaseEntityStore, StoreSort} from "../../../../shared/store/base-entity-store";
import {RestaurantsFiltersContainer} from "../filters/filters-container/restaurants-filters-container";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Restaurant} from "../../../../api/model/restaurant";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {StorePage} from "../../../../shared/features/pagination/data-access/model/paginator-model";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsStore extends BaseEntityStore<Restaurant, RestaurantsFiltersContainer> {
  private readonly api = inject(RestaurantControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): RestaurantsFiltersContainer {
    return new RestaurantsFiltersContainer();
  }

  protected override getAllFromApi(sort: StoreSort, page: StorePage): Observable<Restaurant[]> {
    return this.api.getRestaurantsByFilter({...sort, ...page})
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
