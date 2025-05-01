import {inject, Injectable} from "@angular/core";
import {Ingredient} from "../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../api/api/ingredientController.service";
import {IngredientsFiltersContainer} from "../filters/filters-container/ingredients-filters-container";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientsStore extends BaseEntityStore<Ingredient, IngredientsFiltersContainer> {
  private readonly ingredientsApi = inject(IngredientControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): IngredientsFiltersContainer {
      return new IngredientsFiltersContainer();
  }
  protected override getAllFromApi(): Observable<Ingredient[]> {
      return this.ingredientsApi.getIngredientsByFilter({isActual: true})
        .pipe(
          map(list => {
            return list.items;
          })
        );
  }
  protected override getByIdFromApi(id: number): Observable<Ingredient> {
      return this.ingredientsApi.getIngredientById(id);
  }
}
