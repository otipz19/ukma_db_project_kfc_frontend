import {Component, inject, input} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MealsFiltersService} from "../../../features/filters/data-access/services/meals-filters.service";
import {MatIcon} from "@angular/material/icon";
import {BaseEntityStore} from "../../../../../shared/store/base-entity-store";
import {Meal} from "../../../../../api/model/meal";
import {MealsFilter} from "../../../../../api/model/mealsFilter";
import {MealsFiltersContainer} from "../../../data-access/filters/meals-filters-container";

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
export class MealsFiltersComponent<TStore extends BaseEntityStore<Meal, MealsFilter, MealsFiltersContainer>> {
  private readonly filtersService = inject(MealsFiltersService);
  readonly $store = input.required<TStore>({alias: 'store'});

  protected onPriceRangeToggle() {
    this.$store().filters.priceRange.toggleFilter();
    this.$store().loadAll();
  }

  protected onPriceRangeForm() {
    this.filtersService.openPriceRange(this.$store());
  }

  protected onAdditionalPriceToggle() {
    this.$store().filters.additionalPriceRange.toggleFilter();
    this.$store().loadAll();
  }

  protected onAdditionalPriceForm() {
    this.filtersService.openAdditionalPriceRange(this.$store());
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
