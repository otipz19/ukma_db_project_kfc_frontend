import {Component, inject, OnInit, Signal} from '@angular/core';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Ingredient} from "../../../../../../../api/model/ingredient";
import {
  IngredientCardComponent
} from "../../../../../../ingredients/view/components/ingredient-card/ingredient-card.component";
import {SearchBarComponent} from "../../../../../../../shared/components/search-bar/search-bar.component";
import {
  CommonPaginatorComponent
} from "../../../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PageEvent} from "@angular/material/paginator";
import {
    IngredientsChipFiltersComponent
} from "../../../../../../ingredients/view/components/ingredients-chip-filters/ingredients-chip-filters.component";
import {SelectIngredientStore} from "../../../../../../ingredients/data-access/store/select-ingredient.store";

@Component({
  selector: 'app-add-ingredient-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        IngredientCardComponent,
        SearchBarComponent,
        CommonPaginatorComponent,
        IngredientsChipFiltersComponent
    ],
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrl: './add-ingredient-dialog.component.scss'
})
export class AddIngredientDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AddIngredientDialogComponent, Ingredient>);
  protected readonly ingredientsStore = inject(SelectIngredientStore);

  protected readonly $ingredients: Signal<Ingredient[]> = this.ingredientsStore.$viewList;

  protected readonly skeletonDummyIngredient: Ingredient = {
    title: '',
    id: -1,
    energeticValue: -1,
    price: -1,
    weight: -1
  };

  ngOnInit() {
    this.ingredientsStore.loadAll();
  }

  protected onPagination(page: PageEvent) {
    this.ingredientsStore.paginatorModel.setPageEvent(page);
    this.ingredientsStore.loadAll();
  }

  protected onSearch(query: string) {
    this.ingredientsStore.filters.search.setQuery(query);
    this.ingredientsStore.loadAll();
  }

  protected onSelect(ingredient: Ingredient) {
    this.dialogRef.close(ingredient);
  }
}
