import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  MealsPriceRangeFilterFormComponent
} from "../../view/components/meals-price-filter/meals-price-range-filter-form.component";
import {MealsStore} from "../../../../data-access/store/meals.store";
import {of} from "rxjs";
import {
  MealsWeightRangeFilterFormComponent
} from "../../view/components/meals-weight-range-filter-form/meals-weight-range-filter-form.component";
import {
  MealsEnergeticValueRangeFilterFormComponent
} from "../../view/components/meals-energetic-value-range-filter-form/meals-energetic-value-range-filter-form.component";
import {
  MealsAdditionalPriceRangeFilterFormComponent
} from "../../view/components/meals-additional-price-range-filter-form/meals-additional-price-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class MealsFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly store = inject(MealsStore);

  openPriceRange() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон цін',
        formComponent: MealsPriceRangeFilterFormComponent,
        initialValue: this.store.filters.priceRange.getRange(),
        submitCallback: (priceRange) => {
          this.store.filters.priceRange.setRange(priceRange);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openAdditionalPriceRange() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон доданої вартості',
        formComponent: MealsAdditionalPriceRangeFilterFormComponent,
        initialValue: this.store.filters.additionalPriceRange.getRange(),
        submitCallback: (priceRange) => {
          this.store.filters.additionalPriceRange.setRange(priceRange);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openWeightRange() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон ваги',
        formComponent: MealsWeightRangeFilterFormComponent,
        initialValue: this.store.filters.weightRange.getRange(),
        submitCallback: (range) => {
          this.store.filters.weightRange.setRange(range);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openEnergeticValue() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон енергетичної цінності',
        formComponent: MealsEnergeticValueRangeFilterFormComponent,
        initialValue: this.store.filters.energeticValueRange.getRange(),
        submitCallback: (range) => {
          this.store.filters.energeticValueRange.setRange(range);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }
}
