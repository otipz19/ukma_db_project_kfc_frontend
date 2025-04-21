import {Component, input} from '@angular/core';
import {Meal} from "../../../../../api/model/meal";
import {MealCardComponent} from "../meals-card/meal-card.component";

@Component({
  selector: 'app-meals-list',
  imports: [
    MealCardComponent
  ],
  templateUrl: './meals-list.component.html',
  styleUrl: './meals-list.component.scss'
})
export class MealsListComponent {
  readonly $meals = input.required<Array<Meal>>({alias: 'meals'});
}
