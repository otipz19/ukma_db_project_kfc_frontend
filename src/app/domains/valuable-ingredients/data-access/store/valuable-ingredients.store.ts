import {BaseStatsStore} from "../../../../shared/store/base-stats-store";
import {Ingredient} from "../../../../api/model/ingredient";
import {ValuableIngredientsFilter} from "../../../../api/model/valuableIngredientsFilter";
import {
  ValuableIngredientsFiltersContainer
} from "../../features/filters/data-access/model/valuable-ingredients.filters-container";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {IngredientControllerService} from "../../../../api/api/ingredientController.service";

@Injectable({
  providedIn: 'root'
})
export class ValuableIngredientsStore extends BaseStatsStore<Ingredient, ValuableIngredientsFilter, ValuableIngredientsFiltersContainer> {
  private readonly api = inject(IngredientControllerService);

  protected override buildFiltersContainer(): ValuableIngredientsFiltersContainer {
    return new ValuableIngredientsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<ValuableIngredientsFilter>): Observable<Ingredient[]> {
    return this.api.getValuableIngredients({minMealPrice: 0, ...filterDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items;
        })
      );
  }
}
