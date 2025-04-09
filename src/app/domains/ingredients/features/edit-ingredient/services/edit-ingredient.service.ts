import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  IngredientUpsertFormComponent
} from "../../../view/components/ingredient-upsert-form/ingredient-upsert-form.component";
import {Ingredient} from "../../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../../api/api/ingredientController.service";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {EMPTY, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditIngredientService {
  private readonly api = inject(IngredientControllerService);
  private readonly upsertDialogService = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(IngredientsStore);

  edit(ingredient: Ingredient) {
    const {id, ...formInitValue} = ingredient;

    this.upsertDialogService.openUpsert$({
      title: 'Створення інгредієнта',
      formComponent: IngredientUpsertFormComponent,
      initialValue: formInitValue
    })
      .pipe(
        switchMap(updateDto => {
          if (updateDto) {
            return this.api.updateIngredient(id, updateDto)
          }
          return EMPTY;
        }),
        this.notify.notifyHttpRequest()
      )
      .subscribe(updatedId => {
        this.store.update(id, updatedId);
      });
  }
}
