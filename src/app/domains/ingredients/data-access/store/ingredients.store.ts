import {inject, Injectable, signal} from "@angular/core";
import {Ingredient} from "../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../api/api/ingredientController.service";
import {IngredientsFiltersContainer} from "../filters/filters-container/ingredients-filters-container";

@Injectable({
  providedIn: 'root'
})
export class IngredientsStore {
  private readonly ingredientsApi = inject(IngredientControllerService);

  readonly filters = new IngredientsFiltersContainer();

  private readonly $responseList = signal<Array<Ingredient>>([]);
  private readonly $filteredList = this.filters.$filterSignal(this.$responseList);
  readonly $viewList = this.$filteredList;

  loadAll() {
    this.ingredientsApi.getAllIngredients()
      .subscribe(result => {
        this.$responseList.set(result);
      });
  }

  load(id: Ingredient['id']) {
    this.ingredientsApi.getIngredientById(id)
      .subscribe(result => {
        this.$responseList.update(oldVal => [result, ...oldVal]);
      });
  }

  update(oldId: Ingredient['id'], newId: Ingredient['id']) {
    this.ingredientsApi.getIngredientById(newId)
      .subscribe(result => {
        this.$responseList.update(oldVal => {
          const val = oldVal.filter(item => item.id !== oldId);
          val.push(result);
          return val;
        });
      });
  }

  remove(id: Ingredient['id']) {
    this.$responseList.update(oldValue => {
      return oldValue.filter(item => item.id !== id);
    });
  }

  reloadOnFilter() {
    this.$responseList.update(val => [...val]);
  }
}
