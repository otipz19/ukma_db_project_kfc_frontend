import {Component, input} from '@angular/core';
import {IngredientCardComponent} from "../ingredient-card/ingredient-card.component";
import {Ingredient} from "../../../../../api/model/ingredient";

@Component({
  selector: 'app-ingredients-list',
  imports: [
    IngredientCardComponent,
  ],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss'
})
export class IngredientsListComponent {
  readonly $ingredients = input.required<Array<Ingredient>>({alias: 'ingredients'});
  readonly $hideActions = input<boolean>(false, {alias: 'hideActions'});
}
