import {Component, inject, OnInit} from '@angular/core';
import {IngredientsListComponent} from "../../components/ingredients-list/ingredients-list.component";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {CreateIngredientService} from "../../../features/create-ingredient/services/create-ingredient.service";

@Component({
  selector: 'app-ingredients-page',
  imports: [
    IngredientsListComponent,
    SearchBarComponent,
    MatButton,
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss',
})
export class IngredientsPageComponent implements OnInit {
  private readonly store = inject(IngredientsStore);
  private readonly createService = inject(CreateIngredientService);

  protected readonly $ingredients = this.store.$viewList;

  ngOnInit(): void {
    this.store.loadAll();
  }

  onCreateClick() {
    this.createService.create();
  }

  onSearch(query: string) {
    this.store.filters.titleFilter.setFilter(query);
    this.store.forceSignalReload();
  }
}
