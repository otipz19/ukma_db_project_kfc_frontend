import {Component, input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {Ingredient} from "../../../../../../../api/model/ingredient";
import {MealIngredient} from "../../../../../../../api/model/mealIngredient";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-meal-ingredient-card',
  imports: [
    MatCard,
    MatIconButton,
    MatCheckbox
  ],
  templateUrl: './meal-ingredient-card.component.html',
  styleUrl: './meal-ingredient-card.component.scss'
})
export class MealIngredientCardComponent {
  readonly $ingredient = input.required<Ingredient>({alias: 'ingredient'});
  readonly $mealIngredient = input.required<MealIngredient>({alias: 'mealIngredient'});

  getMealIngredient(): MealIngredient {
    return this.$mealIngredient();
  }

  protected onIncrease() {
    this.$mealIngredient().amount++;
  }

  protected onDecrease() {
    this.$mealIngredient().amount--;
  }

  protected onFixatedChange() {
    this.$mealIngredient().isFixated = !this.$mealIngredient().isFixated;
  }

  protected shouldDisableCheckbox(): boolean {
    return !this.$mealIngredient().isFixated && this.$mealIngredient().amount === 0;
  }

  protected shouldDisableDecrease(): boolean {
    return this.$mealIngredient().amount === 0 || (this.$mealIngredient().amount === 1 && this.$mealIngredient().isFixated);
  }
}
