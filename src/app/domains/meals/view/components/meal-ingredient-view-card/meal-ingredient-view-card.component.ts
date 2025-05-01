import {booleanAttribute, Component, input} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatCard} from "@angular/material/card";
import {Ingredient} from "../../../../../api/model/ingredient";
import {MealIngredient} from "../../../../../api/model/mealIngredient";

@Component({
  selector: 'app-meal-ingredient-view-card',
  imports: [
    MatCheckbox,
    MatCard
  ],
  templateUrl: './meal-ingredient-view-card.component.html',
  styleUrl: './meal-ingredient-view-card.component.scss'
})
export class MealIngredientViewCardComponent {
  readonly $ingredient = input.required<Ingredient>({alias: 'ingredient'});
  readonly $mealIngredient = input.required<MealIngredient>({alias: 'mealIngredient'});
  readonly $hideFixated = input(false, {alias: 'hideFixated'});
}
