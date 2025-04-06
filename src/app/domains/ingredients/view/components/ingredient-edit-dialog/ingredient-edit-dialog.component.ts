import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {IngredientViewDto} from "../../../model/ingredient-view-dto";
import {DialogRef} from "@angular/cdk/dialog";
import {IngredientUpsertFormComponent} from "../ingredient-upsert-form/ingredient-upsert-form.component";

@Component({
  selector: 'app-ingredient-edit-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    IngredientUpsertFormComponent,
  ],
  templateUrl: './ingredient-edit-dialog.component.html',
  styleUrl: './ingredient-edit-dialog.component.scss'
})
export class IngredientEditDialogComponent {
  private readonly dialogRef = inject(DialogRef<IngredientViewDto | undefined>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  onSubmit(updatedIngredient: IngredientViewDto) {
    this.dialogRef.close(updatedIngredient);
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }
}
