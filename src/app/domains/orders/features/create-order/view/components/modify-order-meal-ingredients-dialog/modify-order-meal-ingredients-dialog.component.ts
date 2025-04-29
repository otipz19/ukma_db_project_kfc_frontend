import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {OrderMealIngredient} from "../../../data-access/types/order-meal-ingredient";
import {OrderMealIngredientCardComponent} from "../order-meal-ingredient-card/order-meal-ingredient-card.component";
import {MatButton} from "@angular/material/button";

export type ModifyOrderMealIngredientsDialogData = {
  ingredients: Array<OrderMealIngredient>
};

@Component({
  selector: 'app-modify-order-meal-ingredients-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    OrderMealIngredientCardComponent,
    MatButton
  ],
  templateUrl: './modify-order-meal-ingredients-dialog.component.html',
  styleUrl: './modify-order-meal-ingredients-dialog.component.scss'
})
export class ModifyOrderMealIngredientsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<OrderMealIngredient, OrderMealIngredient>);
  private readonly data: ModifyOrderMealIngredientsDialogData = inject(MAT_DIALOG_DATA);

  protected readonly ingredients = this.data.ingredients;

  protected onSubmit() {
    this.dialogRef.close(this.data);
  }

  protected onCancel() {
    this.dialogRef.close();
  }
}
