import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  IngredientUpsertFormComponent
} from "../../../view/components/ingredient-upsert-form/ingredient-upsert-form.component";
import {IngredientControllerService} from "../../../../../api/api/ingredientController.service";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateIngredientService {
  private readonly api = inject(IngredientControllerService);
  private readonly upsertDialogService = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(IngredientsStore);

  create() {
    this.upsertDialogService.openUpsert$({
      title: 'Створення інгредієнта',
      formComponent: IngredientUpsertFormComponent,
      submitCallback: dto => {
        return this.api.createIngredient(dto)
          .pipe(
            this.notify.notifyHttpRequest(),
            tap(id => {
              this.store.load(id);
            })
          )
      }
    });
  }
}
