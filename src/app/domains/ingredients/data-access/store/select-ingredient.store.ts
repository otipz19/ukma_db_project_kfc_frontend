import {inject, Injectable} from "@angular/core";
import {Ingredient} from "../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../api/api/ingredientController.service";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {map, Observable} from "rxjs";
import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";
import {IngredientsFiltersContainer} from "../filters/ingredients.filters-container";

@Injectable({
  providedIn: 'root'
})
export class SelectIngredientStore extends BaseEntityStore<Ingredient, IngredientsFilter, IngredientsFiltersContainer> {
  private readonly ingredientsApi = inject(IngredientControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): IngredientsFiltersContainer {
      return new IngredientsFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<IngredientsFilter>): Observable<Ingredient[]> {
      return this.ingredientsApi.getIngredientsByFilter({isActual: true, ...filtersDto})
        .pipe(
          map(list => {
            this.setTotalItems(list.total);
            return list.items;
          })
        );
  }

  protected override getByIdFromApi(id: number): Observable<Ingredient> {
      return this.ingredientsApi.getIngredientById(id);
  }
}
