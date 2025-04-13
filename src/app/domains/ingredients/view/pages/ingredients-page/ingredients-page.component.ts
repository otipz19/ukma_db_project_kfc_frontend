import {Component, inject, OnInit} from '@angular/core';
import {IngredientsListComponent} from "../../components/ingredients-list/ingredients-list.component";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {CreateIngredientService} from "../../../features/create-ingredient/services/create-ingredient.service";
import {MatCard, MatCardContent, MatCardFooter} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  imports: [
    IngredientsListComponent,
    SearchBarComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatPaginator,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
  ],
  selector: 'app-ingredients-page',
  styleUrl: './ingredients-page.component.scss',
  templateUrl: './ingredients-page.component.html',
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

  onPaginate(pageEvent: PageEvent) {

  }
}
