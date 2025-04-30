import {Component, input} from '@angular/core';
import {
  CommonDataCardComponent
} from "../../../../../../../shared/components/common-data-card/common-data-card.component";

export type MealStats = {
  price: number,
  weight: number,
  energeticValue: number
};

@Component({
  selector: 'app-meal-stats',
  imports: [
    CommonDataCardComponent,
  ],
  templateUrl: './meal-stats.component.html',
  styleUrl: './meal-stats.component.scss'
})
export class MealStatsComponent {
  readonly $stats = input.required<MealStats>({alias: 'stats'});
}
