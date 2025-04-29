import {Component, input} from '@angular/core';
import {OrderMealIngredient} from "../../../data-access/types/order-meal-ingredient";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-order-meal-ingredient-card',
  imports: [
    MatCard,
    MatIconButton
  ],
  templateUrl: './order-meal-ingredient-card.component.html',
  styleUrl: './order-meal-ingredient-card.component.scss'
})
export class OrderMealIngredientCardComponent {
  readonly $ingredient = input.required<OrderMealIngredient>({alias: 'ingredient'});

  protected onIncrease() {
    this.$ingredient().amount++;
  }

  protected onDecrease() {
    this.$ingredient().amount--;
  }

  protected shouldDisableDecrease(): boolean {
    return this.$ingredient().amount === 0;
  }
}
