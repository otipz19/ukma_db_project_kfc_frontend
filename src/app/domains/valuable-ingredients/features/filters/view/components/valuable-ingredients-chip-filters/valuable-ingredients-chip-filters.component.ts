import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {ValuableIngredientsStore} from "../../../../../data-access/store/valuable-ingredients.store";
import {ValuableIngredientsFiltersService} from "../../../data-access/services/valuable-ingredients-filters.service";

@Component({
  selector: 'app-valuable-ingredients-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './valuable-ingredients-chip-filters.component.html',
  styleUrl: './valuable-ingredients-chip-filters.component.scss'
})
export class ValuableIngredientsChipFiltersComponent {
  private readonly store = inject(ValuableIngredientsStore);
  private readonly filtersService = inject(ValuableIngredientsFiltersService);

  protected onMinMealPriceOpen() {
    this.filtersService.openMinMealPrice();
  }

  protected onMinMealPriceToggle() {
    this.store.filters.minMealPrice.toggleFilter();
    this.store.loadAll();
  }
}
