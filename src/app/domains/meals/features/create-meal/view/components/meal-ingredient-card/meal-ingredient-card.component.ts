import {Component, input, output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {Ingredient} from "../../../../../../../api/model/ingredient";
import {MealIngredient} from "../../../../../../../api/model/mealIngredient";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-meal-ingredient-card',
  imports: [
    MatCard,
    MatIconButton,
    MatCheckbox,
    MatIcon
  ],
  templateUrl: './meal-ingredient-card.component.html',
  styleUrl: './meal-ingredient-card.component.scss'
})
export class MealIngredientCardComponent {
  readonly $ingredient = input.required<Ingredient>({alias: 'ingredient'});
  readonly $mealIngredient = input.required<MealIngredient>({alias: 'mealIngredient'});

  readonly $disableUp = input<boolean>(false, {alias: 'disableUp'});
  readonly $disableDown = input<boolean>(false, {alias: 'disableDown'});

  protected readonly amountChange = output<void>();
  protected readonly delete = output<Ingredient['id']>();
  protected readonly up = output<void>();
  protected readonly down = output<void>();

  getMealIngredient(): MealIngredient {
    return this.$mealIngredient();
  }

  protected onIncrease() {
    this.$mealIngredient().amount++;
    this.amountChange.emit();
  }

  protected onDecrease() {
    this.$mealIngredient().amount--;
    this.amountChange.emit();
  }

  protected onDelete() {
    this.delete.emit(this.$ingredient().id);
  }

  protected onUp() {
    this.up.emit();
  }

  protected onDown() {
    this.down.emit();
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
