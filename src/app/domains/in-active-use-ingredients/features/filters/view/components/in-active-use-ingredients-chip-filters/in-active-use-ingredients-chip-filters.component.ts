import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {InActiveUseIngredientsStore} from "../../../../../data-access/store/in-active-use-ingredients.store";
import {InActiveUseIngredientsFiltersService} from "../../../services/in-active-use-ingredients-filters.service";

@Component({
  selector: 'app-in-active-use-ingredients-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './in-active-use-ingredients-chip-filters.component.html',
  styleUrl: './in-active-use-ingredients-chip-filters.component.scss'
})
export class InActiveUseIngredientsChipFiltersComponent {
  private readonly store = inject(InActiveUseIngredientsStore);
  private readonly filtersService = inject(InActiveUseIngredientsFiltersService);

  protected onDateRangeOpen() {
    this.filtersService.openOrdersDate();
  }

  protected onDateRangeToggle() {
    this.store.filters.dateRange.toggleFilter();
    this.store.loadAll();
  }
}
