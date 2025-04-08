import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  IngredientUpsertFormComponent
} from "../../../view/components/ingredient-upsert-form/ingredient-upsert-form.component";

@Injectable({
  providedIn: 'root'
})
export class CreateIngredientService {
  private readonly upsertDialogService = inject(UpsertDialogService);

  create() {
    this.upsertDialogService.openUpsert$({
      title: 'Створення інгредієнта',
      formComponent: IngredientUpsertFormComponent,
    }).subscribe(createDto => {
      if (createDto) {
        // TODO: call api
      }
    });
  }
}
