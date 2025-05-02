import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RestaurantsStatsStore} from "../../../../../data-access/store/restaurants-stats.store";
import {RestaurantsStatsFiltersService} from "../../../data-access/services/restaurants-stats-filters.service";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";
import {RestaurantsStatsHasManagerOptions} from "../../../data-access/model/restaurants-stats-has-manager.filter-model";
import {
  RestaurantsStatsDeletedFilterOptions
} from "../../../data-access/model/restaurants-stats-deleted-filter.model";

@Component({
  selector: 'app-restaurants-stats-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './restaurants-stats-chip-filters.component.html',
  styleUrl: './restaurants-stats-chip-filters.component.scss'
})
export class RestaurantsStatsChipFiltersComponent {
  private readonly store = inject(RestaurantsStatsStore);
  private readonly filtersService = inject(RestaurantsStatsFiltersService);

  protected onHasManagerToggle(option: RestaurantsStatsHasManagerOptions) {
    this.store.filters.hasManager.toggleOption(option);
    this.store.loadAll();
  }

  protected onDeletedToggle(option: RestaurantsStatsDeletedFilterOptions) {
    this.store.filters.deleted.toggleOption(option);
    this.store.loadAll();
  }

  protected onTotalPriceOpen() {
    this.filtersService.openTotalOrdersPrice();
  }

  protected onTotalPriceToggle() {
    this.store.filters.totalOrdersPrice.toggleFilter();
    this.store.loadAll();
  }

  protected onNumberOpen() {
    this.filtersService.openOrdersNumber();
  }

  protected onNumberToggle() {
    this.store.filters.ordersNumber.toggleFilter();
    this.store.loadAll();
  }

  protected onDateOpen() {
    this.filtersService.openOrdersDate();
  }

  protected onDateToggle() {
    this.store.filters.ordersDate.toggleFilter();
    this.store.loadAll();
  }

  protected readonly EmployeePosition = EmployeePosition;
  protected readonly RestaurantsStatsHasManagerOptions = RestaurantsStatsHasManagerOptions;
  protected readonly RestaurantsStatsDeletedFilterOptions = RestaurantsStatsDeletedFilterOptions;
}
