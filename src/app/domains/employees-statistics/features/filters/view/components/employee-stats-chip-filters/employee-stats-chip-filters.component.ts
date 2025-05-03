import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";
import {EmployeeStatsStore} from "../../../../../data-access/store/employee-stats.store";
import {EmployeeStatsFiltersService} from "../../../data-access/services/employee-stats-filters.service";

@Component({
  selector: 'app-employee-stats-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './employee-stats-chip-filters.component.html',
  styleUrl: './employee-stats-chip-filters.component.scss'
})
export class EmployeeStatsChipFiltersComponent {
  private readonly store = inject(EmployeeStatsStore);
  private readonly filtersService = inject(EmployeeStatsFiltersService);

  // protected onHasManagerToggle(option: RestaurantsStatsHasManagerOptions) {
  //   this.store.filters.hasManager.toggleOption(option);
  //   this.store.loadAll();
  // }
  //
  // protected onDeletedToggle(option: RestaurantsStatsDeletedFilterOptions) {
  //   this.store.filters.deleted.toggleOption(option);
  //   this.store.loadAll();
  // }

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
}
