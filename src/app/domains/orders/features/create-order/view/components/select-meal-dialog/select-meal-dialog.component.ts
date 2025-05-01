import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {SearchBarComponent} from "../../../../../../../shared/components/search-bar/search-bar.component";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MealCardComponent} from "../../../../../../meals/view/components/meals-card/meal-card.component";
import {MealsStore} from "../../../../../../meals/data-access/store/meals.store";
import {Meal} from "../../../../../../../api/model/meal";
import {
  CommonPaginatorComponent
} from "../../../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PageEvent} from "@angular/material/paginator";
import {MealsFiltersComponent} from "../../../../../../meals/view/components/meals-filters/meals-filters.component";

export type SelectMealDialogData = {
  alreadyPresentMealsIdList: Array<Meal['id']>,
};

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
  protected readonly store = inject(MealsStore);
  private readonly dialogRef = inject(MatDialogRef<SelectMealDialogData, Meal>);
  private readonly data: SelectMealDialogData = inject(MAT_DIALOG_DATA);

  protected readonly $meals: Signal<Meal[]> = computed(() => {
    return this.store.$viewList().filter(m => !this.data.alreadyPresentMealsIdList.includes(m.id));
  });

  ngOnInit() {
    this.store.initialLoad();
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
    this.dialogRef.close(meal);
  }
}
