import {Component, inject, input} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {IngredientsFiltersService} from "../../../features/filters/data-access/services/ingredients-filters.service";
import {BaseEntityStore} from "../../../../../shared/store/base-entity-store";
import {Ingredient} from "../../../../../api/model/ingredient";
import {IngredientsFilter} from "../../../../../api/model/ingredientsFilter";
import {IngredientsFiltersContainer} from "../../../data-access/filters/ingredients.filters-container";

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
export class IngredientsChipFiltersComponent<TStore extends BaseEntityStore<Ingredient, IngredientsFilter, IngredientsFiltersContainer>> {
  private readonly filtersService = inject(IngredientsFiltersService);
  readonly $store = input.required<TStore>({alias: 'store'});

  protected onPriceRangeToggle() {
    this.$store().filters.priceRange.toggleFilter();
    this.$store().loadAll();
  }

  protected onPriceRangeForm() {
    this.filtersService.openPriceRange(this.$store());
  }

  protected onWeightRangeToggle() {
    this.$store().filters.weightRange.toggleFilter();
    this.$store().loadAll();
  }

  protected onWeightRangeForm() {
    this.filtersService.openWeightRange(this.$store());
  }

  protected onEnergeticValueToggle() {
    this.$store().filters.energeticValueRange.toggleFilter();
    this.$store().loadAll();
  }

  protected onEnergeticValueForm() {
    this.filtersService.openEnergeticValue(this.$store());
  }
}
