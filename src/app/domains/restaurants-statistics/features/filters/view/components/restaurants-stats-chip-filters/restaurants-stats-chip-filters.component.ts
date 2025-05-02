import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RestaurantsStatsStore} from "../../../../../data-access/store/restaurants-stats.store";
import {RestaurantsStatsFiltersService} from "../../../data-access/services/restaurants-stats-filters.service";

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
}
