import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MealStatsStore} from "../../../../../data-access/store/meal-stats.store";
import {MealStatsFiltersService} from "../../../data-access/services/meal-stats-filters.service";
import {MealStatus} from "../../../data-access/model/meal-stats-status-filter.model";

@Component({
  selector: 'app-meal-stats-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './meal-stats-chip-filters.component.html',
  styleUrl: './meal-stats-chip-filters.component.scss'
})
export class MealStatsChipFiltersComponent {
  private readonly store = inject(MealStatsStore);
  private readonly filtersService = inject(MealStatsFiltersService);

  protected isOptionsSelected(option: MealStatus) {
    return this.store.filters.actual.isOptionEnabled(option);
  }

  protected onOptionToggle(option: MealStatus) {
    this.store.filters.actual.toggleOption(option);
    this.store.loadAll();
  }

  protected onClientMealsOpen() {
    this.filtersService.openClientMeals();
  }

  protected onClientMealsToggle() {
    this.store.filters.clientMeals.toggleFilter();
    this.store.loadAll();
  }

  protected onLastOrderedOpen() {
    this.filtersService.openLastOrdered();
  }

  protected onLastOrderedToggle() {
    this.store.filters.lastOrdered.toggleFilter();
    this.store.loadAll();
  }

  protected readonly MealStatus = MealStatus;
}
