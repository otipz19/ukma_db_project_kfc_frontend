import {Component, input, output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OrderMeal} from "../../../data-access/types/order-meal";

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
  readonly $meal = input.required<OrderMeal>({alias: 'meal'});

  protected readonly update = output<void>();
  protected readonly delete = output<OrderMeal['id']>();

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
    this.delete.emit(this.$meal().id);
  }

  protected onModify() {

  }
}
