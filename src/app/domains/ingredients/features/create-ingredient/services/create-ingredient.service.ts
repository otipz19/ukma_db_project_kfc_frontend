import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  IngredientUpsertFormComponent
} from "../../../view/components/ingredient-upsert-form/ingredient-upsert-form.component";
import {IngredientControllerService} from "../../../../../api/api/ingredientController.service";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {EMPTY, switchMap} from "rxjs";

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
    })
      .pipe(
        switchMap(dto => {
          if (dto) {
            return this.api.createIngredient(dto)
          }
          return EMPTY;
        }),
        this.notify.notifyHttpRequest()
      )
      .subscribe(id => {
        this.store.load(id);
      });
  }
}
