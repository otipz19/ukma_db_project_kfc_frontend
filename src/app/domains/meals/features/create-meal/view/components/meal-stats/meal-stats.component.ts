import {Component, input} from '@angular/core';
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
} from "@angular/material/card";

export type MealStats = {
  price: number,
  weight: number,
  energeticValue: number
};

@Component({
  selector: 'app-meal-stats',
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
    ],
  templateUrl: './meal-stats.component.html',
  styleUrl: './meal-stats.component.scss'
})
export class MealStatsComponent {
  readonly $stats = input.required<MealStats>({alias: 'stats'});
}
