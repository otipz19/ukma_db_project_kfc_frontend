import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {Meal} from "../../../../api/model/meal";
import {MealsFiltersContainer} from "../filters/filters-container/meals.filters-container";
import {Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {MealControllerService} from "../../../../api/api/mealController.service";

@Injectable({
  providedIn: 'root'
})
export class MealsStore extends BaseEntityStore<Meal, MealsFiltersContainer> {
  private mealsApi = inject(MealControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): MealsFiltersContainer {
    return new MealsFiltersContainer();
  }

  protected override getAllFromApi(): Observable<Meal[]> {
    return this.mealsApi.getAllMeals();
  }

  protected override getByIdFromApi(id: number): Observable<Meal> {
    return this.mealsApi.getMealById(id);
  }
}
