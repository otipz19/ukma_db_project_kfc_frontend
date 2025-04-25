import {Component, input, output} from '@angular/core';
import {Ingredient} from '../../../../../../../api/model/ingredient';
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-meal-ingredient-card',
  imports: [
    MatCard,
    MatIconButton
  ],
  templateUrl: './meal-ingredient-card.component.html',
  styleUrl: './meal-ingredient-card.component.scss'
})
export class MealIngredientCardComponent {
  readonly $ingredient = input.required<Ingredient>({alias: 'ingredient'});
  readonly $isFixated = input.required<boolean>({alias: 'isFixated'});
  readonly $amount = input.required<number>({alias: 'amount'});

  protected readonly amountChange = output<number>();

  increase() {
    this.amountChange.emit(this.$amount() + 1);
  }

  decrease() {
    if (this.$amount() > 0) {
      this.amountChange.emit(this.$amount() - 1);
    }
  }
}
