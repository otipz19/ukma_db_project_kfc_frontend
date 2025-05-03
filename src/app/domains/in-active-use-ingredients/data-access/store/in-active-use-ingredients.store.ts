import {BaseStatsStore} from "../../../../shared/store/base-stats-store";
import {Ingredient} from "../../../../api/model/ingredient";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {IngredientControllerService} from "../../../../api/api/ingredientController.service";
import {IngredientsInActiveUseFilter} from "../../../../api/model/ingredientsInActiveUseFilter";
import {
  InActiveUseIngredientsFiltersContainer
} from "../../features/filters/model/in-active-use-ingredients.filters-container";

@Injectable({
  providedIn: 'root'
})
export class InActiveUseIngredientsStore extends BaseStatsStore<Ingredient, IngredientsInActiveUseFilter, InActiveUseIngredientsFiltersContainer> {
  private readonly api = inject(IngredientControllerService);

  protected override buildFiltersContainer(): InActiveUseIngredientsFiltersContainer {
    return new InActiveUseIngredientsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<IngredientsInActiveUseFilter>): Observable<Ingredient[]> {
    return this.api.getIngredientsInActiveUse({...filterDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items;
        })
      );
  }
}
