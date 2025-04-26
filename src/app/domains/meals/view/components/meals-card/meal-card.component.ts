import {Component, input} from '@angular/core';
import { Meal } from '../../../../../api/model/meal';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-meal-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatIcon,
    MatCardTitle,
    RouterLink
  ],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss'
})
export class MealCardComponent {
  readonly $meal = input.required<Meal>({alias: 'meal'});

  onEdit() {

  }

  onDelete() {

  }
}
