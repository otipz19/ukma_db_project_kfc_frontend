import {Component, inject, OnInit, Signal} from '@angular/core';
import {SearchBarComponent} from "../../../../../../../shared/components/search-bar/search-bar.component";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MealCardComponent} from "../../../../../../meals/view/components/meals-card/meal-card.component";
import {Meal} from "../../../../../../../api/model/meal";
import {
  CommonPaginatorComponent
} from "../../../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PageEvent} from "@angular/material/paginator";
import {MealsFiltersComponent} from "../../../../../../meals/view/components/meals-filters/meals-filters.component";
import {SelectMealStore} from "../../../../../../meals/data-access/store/select-meal-store";

@Component({
  imports: [
    SearchBarComponent,
    MatDialogContent,
    MealCardComponent,
    MatDialogTitle,
    CommonPaginatorComponent,
    MealsFiltersComponent,
  ],
  selector: 'app-select-meal-dialog',
  styleUrl: './select-meal-dialog.component.scss',
  templateUrl: './select-meal-dialog.component.html'
})
export class SelectMealDialogComponent implements OnInit {
  protected readonly store = inject(SelectMealStore);
  private readonly dialogRef = inject(MatDialogRef<void, Meal>);

  protected readonly $meals: Signal<Meal[]> = this.store.$viewList;

  ngOnInit() {
    this.store.loadAll();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onSearch(query: string) {
    this.store.filters.search.setQuery(query);
    this.store.loadAll();
  }

  protected onSelect(meal: Meal) {
    this.store.filters.exclude.exclude(meal.id);
    this.dialogRef.close(meal);
  }
}
