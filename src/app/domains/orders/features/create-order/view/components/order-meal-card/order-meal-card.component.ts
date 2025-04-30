import {Component, inject, input, output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OrderMeal} from "../../../data-access/types/order-meal";
import {MatDialog} from "@angular/material/dialog";
import {
  ModifyOrderMealIngredientsDialogComponent, ModifyOrderMealIngredientsDialogData
} from "../modify-order-meal-ingredients-dialog/modify-order-meal-ingredients-dialog.component";
import {OrderMealIngredient} from "../../../data-access/types/order-meal-ingredient";

@Component({
  selector: 'app-order-meal-card',
  imports: [
    MatCard,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './order-meal-card.component.html',
  styleUrl: './order-meal-card.component.scss'
})
export class OrderMealCardComponent {
  private readonly matDialog = inject(MatDialog);

  readonly $meal = input.required<OrderMeal>({alias: 'meal'});

  protected readonly update = output<void>();
  protected readonly delete = output<void>();

  protected onIncrease() {
    this.$meal().amount++;
    this.update.emit();
  }

  protected onDecrease() {
    this.$meal().amount--;
    this.update.emit();
  }

  protected shouldDisableDecrease(): boolean {
    return this.$meal().amount === 1;
  }

  protected onDelete() {
    this.delete.emit();
  }

  protected onModify() {
    const dialogRef = this.matDialog.open<ModifyOrderMealIngredientsDialogComponent, ModifyOrderMealIngredientsDialogData, ModifyOrderMealIngredientsDialogData>(
      ModifyOrderMealIngredientsDialogComponent,
      {
        data: {
          ingredients: this.$meal().ingredients.filter(i => !i.isFixated)
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          const meal = this.$meal();
          meal.ingredients = meal.ingredients.filter(i => i.isFixated);
          meal.ingredients.push(...data.ingredients);
          meal.price = meal.additionalPrice + this.sumIngredients(meal.ingredients, i => i.price);
          meal.weight = this.sumIngredients(meal.ingredients, i => i.weight);
          meal.energeticValue = this.sumIngredients(meal.ingredients, i => i.energeticValue);
          this.update.emit();
        }
      });
  }

  private sumIngredients(ingredients: OrderMealIngredient[], selector: (i: OrderMealIngredient) => number): number {
    return ingredients.reduce((sum, i) => sum + selector(i) * i.amount, 0);
  }

  protected shouldDisplayModifyBtn(): boolean {
    return this.$meal().ingredients.filter(i => !i.isFixated).length !== 0;
  }
}
