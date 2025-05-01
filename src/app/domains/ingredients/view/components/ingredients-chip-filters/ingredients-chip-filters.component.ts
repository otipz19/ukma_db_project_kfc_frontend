import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {IngredientsFiltersService} from "../../../features/filters/data-access/services/ingredients-filters.service";

@Component({
  selector: 'app-ingredients-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './ingredients-chip-filters.component.html',
  styleUrl: './ingredients-chip-filters.component.scss'
})
export class IngredientsChipFiltersComponent {
  protected readonly store = inject(IngredientsStore);
  private readonly filtersService = inject(IngredientsFiltersService);

  protected onPriceRangeToggle() {
    this.store.filters.priceRange.toggleFilter();
    this.store.loadAll();
  }

  protected onPriceRangeForm() {
    this.filtersService.openPriceRange();
  }

  protected onWeightRangeToggle() {
    this.store.filters.weightRange.toggleFilter();
    this.store.loadAll();
  }

  protected onWeightRangeForm() {
    this.filtersService.openWeightRange();
  }

  protected onEnergeticValueToggle() {
    this.store.filters.energeticValueRange.toggleFilter();
    this.store.loadAll();
  }

  protected onEnergeticValueForm() {
    this.filtersService.openEnergeticValue();
  }
}
