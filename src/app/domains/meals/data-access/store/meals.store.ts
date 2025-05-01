import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {Meal} from "../../../../api/model/meal";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {MealControllerService} from "../../../../api/api/mealController.service";
import {MealsFilter} from "../../../../api/model/mealsFilter";
import {MealsFiltersContainer} from "../filters/meals-filters-container";

@Injectable({
  providedIn: 'root'
})
export class MealsStore extends BaseEntityStore<Meal, MealsFilter, MealsFiltersContainer> {
  private mealsApi = inject(MealControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): MealsFiltersContainer {
    return new MealsFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<MealsFilter>): Observable<Meal[]> {
    return this.mealsApi.getMealsByFilter({isActual: true, ...filtersDto})
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
