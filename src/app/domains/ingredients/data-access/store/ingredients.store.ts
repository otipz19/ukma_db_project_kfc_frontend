import {inject, Injectable, signal} from "@angular/core";
import {Ingredient} from "../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../api/api/ingredientController.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientsStore {
  private readonly ingredientsApi = inject(IngredientControllerService);

  private readonly $responseList = signal<Array<Ingredient>>([]);

  readonly $viewList = this.$responseList.asReadonly();

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

  // TODO: make as wrapper signal
  filter(title: string) {
    this.$responseList.update(oldVal => {
      return oldVal.filter(item => item.title.toLowerCase().includes(title));
    });
  }
}
