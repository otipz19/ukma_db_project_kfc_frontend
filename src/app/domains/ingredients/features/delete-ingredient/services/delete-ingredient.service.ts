import {inject, Injectable} from "@angular/core";
import {DeleteDialogService} from "../../../../../shared/features/delete-dialog/services/delete-dialog.service";
import {IngredientDto} from "../../../model/ingredient-dto";

@Injectable({
  providedIn: 'root'
})
export class DeleteIngredientService {
  private readonly deleteDialogService = inject(DeleteDialogService);

  delete(ingredient: IngredientDto) {
    this.deleteDialogService.confirmDelete$({
      entityTypeName: 'інгредієнт',
      entityInstanceName: ingredient.title
    }).subscribe(isConfirmed => {
      if(isConfirmed) {
        // TODO: Call api
      }
    });
  }
}
