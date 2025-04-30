import {Component, input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {ClientMealInfo} from "../../../data-access/types/client-meal-info";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-order-meal-view-card',
  imports: [
    MatCard,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './order-meal-view-card.component.html',
  styleUrl: './order-meal-view-card.component.scss'
})
export class OrderMealViewCardComponent {
  readonly $meal = input.required<ClientMealInfo>({alias: 'meal'});

  protected onView() {

  }
}
