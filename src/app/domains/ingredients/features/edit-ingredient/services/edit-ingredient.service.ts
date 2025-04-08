import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  IngredientUpsertFormComponent
} from "../../../view/components/ingredient-upsert-form/ingredient-upsert-form.component";
import {IngredientDto} from "../../../model/ingredient-dto";

@Injectable({
  providedIn: 'root'
})
export class EditIngredientService {
  private readonly upsertDialogService = inject(UpsertDialogService);

  edit(ingredient: IngredientDto) {
    const {id, ...formInitValue} = ingredient;

    this.upsertDialogService.openUpsert$({
      title: 'Створення інгредієнта',
      formComponent: IngredientUpsertFormComponent,
      initialValue: formInitValue
    }).subscribe(updateDto => {
      if (updateDto) {
        // TODO: call api
      }
    });
  }
}
