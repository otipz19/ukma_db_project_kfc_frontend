import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MealsStore} from "../../../data-access/store/meals.store";
import {MealsFiltersService} from "../../../features/filters/data-access/services/meals-filters.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-meals-filters',
  imports: [
    MatChipListbox,
    MatChipOption,
    MatIcon,
    MatChipRemove,
  ],
  templateUrl: './meals-filters.component.html',
  styleUrl: './meals-filters.component.scss'
})
export class MealsFiltersComponent {
  protected readonly store = inject(MealsStore);
  private readonly filtersService = inject(MealsFiltersService);

  protected onPriceRangeToggle() {
    this.store.filters.priceRange.toggleFilter();
    this.store.loadAll();
  }

  protected onPriceRangeForm() {
    this.filtersService.openPriceRange();
  }

  protected onAdditionalPriceToggle() {
    this.store.filters.additionalPriceRange.toggleFilter();
    this.store.loadAll();
  }

  protected onAdditionalPriceForm() {
    this.filtersService.openAdditionalPriceRange();
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
