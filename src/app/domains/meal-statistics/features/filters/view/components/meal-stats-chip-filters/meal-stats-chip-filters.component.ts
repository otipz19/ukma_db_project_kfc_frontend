import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MealStatsStore} from "../../../../../data-access/store/meal-stats.store";
import {MealStatsFiltersService} from "../../../data-access/services/meal-stats-filters.service";

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

  // protected isPositionSelected(position: EmployeePosition) {
  //   return this.store.filters.position.isPositionEnabled(position);
  // }
  //
  // protected onPositionToggle(position: EmployeePosition) {
  //   this.store.filters.position.togglePosition(position);
  //   this.store.loadAll();
  // }

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
}
