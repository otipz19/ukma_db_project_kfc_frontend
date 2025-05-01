import {BaseEntityStore, StoreSort} from "../../../../shared/store/base-entity-store";
import {Meal} from "../../../../api/model/meal";
import {MealsFiltersContainer} from "../filters/filters-container/meals.filters-container";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {MealControllerService} from "../../../../api/api/mealController.service";
import {StorePage} from "../../../../shared/features/pagination/data-access/model/paginator-model";

@Injectable({
  providedIn: 'root'
})
export class MealsStore extends BaseEntityStore<Meal, MealsFiltersContainer> {
  private mealsApi = inject(MealControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): MealsFiltersContainer {
    return new MealsFiltersContainer();
  }

  protected override getAllFromApi(sort: StoreSort, page: StorePage): Observable<Meal[]> {
    return this.mealsApi.getMealsByFilter({isActual: true, ...sort, ...page})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items;
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<Meal> {
    return this.mealsApi.getMealById(id);
  }
}
