import {Component, inject, signal} from '@angular/core';
import {IngredientCardComponent} from "../../components/ingredient-card/ingredient-card.component";
import {INGREDIENTS} from "../../../model/mock-data";
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {CreateIngredientService} from "../../../features/create-ingredient/services/create-ingredient.service";

@Component({
  selector: 'app-ingredient-list',
  imports: [
    IngredientCardComponent,
    SearchBarComponent,
    MatButton,
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {
  private readonly createIngredientService = inject(CreateIngredientService);

  protected readonly $ingredients = signal(INGREDIENTS);

  protected onSearch(query: string) {
    const filtered = INGREDIENTS.filter(ingredient => ingredient.title.toLowerCase().includes(query));
    this.$ingredients.set(filtered);
  }

  onCreateClick(): void {
    this.createIngredientService.create();
  }
}
