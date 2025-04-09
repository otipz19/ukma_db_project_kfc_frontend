import {inject, Injectable} from "@angular/core";
import {DeleteDialogService} from "../../../../../shared/features/delete-dialog/services/delete-dialog.service";
import {Ingredient} from "../../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../../api/api/ingredientController.service";
import {switchMap} from "rxjs";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";

@Injectable({
  providedIn: 'root'
})
export class DeleteIngredientService {
  private readonly api = inject(IngredientControllerService);
  private readonly deleteDialogService = inject(DeleteDialogService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(IngredientsStore);

  delete(ingredient: Ingredient) {
    this.deleteDialogService.confirmDelete$({
      entityTypeName: 'інгредієнт',
      entityInstanceName: ingredient.title
    })
      .pipe(
        switchMap(() => {
          return this.api.deleteIngredient(ingredient.id);
        }),
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.store.remove(ingredient.id);
      });
  }
}
