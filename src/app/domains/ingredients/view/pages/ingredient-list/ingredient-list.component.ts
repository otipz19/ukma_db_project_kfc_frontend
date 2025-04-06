import {Component, signal} from '@angular/core';
import {IngredientCardComponent} from "../../components/ingredient-card/ingredient-card.component";
import {INGREDIENTS} from "../../../model/mock-data";
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-ingredient-list',
  imports: [
    IngredientCardComponent,
    SearchBarComponent,
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {
  protected readonly $ingredients = signal(INGREDIENTS);

  protected onSearch(query: string) {
    const filtered = INGREDIENTS.filter(ingredient => ingredient.title.toLowerCase().includes(query));
    this.$ingredients.set(filtered);
  }
}
