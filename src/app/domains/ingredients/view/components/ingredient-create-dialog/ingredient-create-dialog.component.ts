import {Component, inject} from '@angular/core';
import {IngredientUpsertFormComponent} from "../ingredient-upsert-form/ingredient-upsert-form.component";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {IngredientViewDto} from "../../../model/ingredient-view-dto";

@Component({
  selector: 'app-ingredient-create-dialog',
  imports: [
    IngredientUpsertFormComponent,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './ingredient-create-dialog.component.html',
  styleUrl: './ingredient-create-dialog.component.scss'
})
export class IngredientCreateDialogComponent {
  private readonly dialogRef = inject(DialogRef<IngredientViewDto | undefined>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  onSubmit(updatedIngredient: IngredientViewDto) {
    this.dialogRef.close(updatedIngredient);
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }
}
