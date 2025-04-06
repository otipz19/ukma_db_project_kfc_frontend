import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

export type IngredientDeleteDialogData = {
  title: string
};

@Component({
  selector: 'app-ingredient-delete-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './ingredient-delete-dialog.component.html',
  styleUrl: './ingredient-delete-dialog.component.scss'
})
export class IngredientDeleteDialogComponent {
  protected readonly dialogRef = inject(MatDialogRef<IngredientDeleteDialogComponent>);
  protected readonly data: IngredientDeleteDialogData = inject(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
