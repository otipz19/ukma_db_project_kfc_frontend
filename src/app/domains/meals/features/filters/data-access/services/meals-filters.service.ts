import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  MealsPriceRangeFilterFormComponent
} from "../../view/components/meals-price-filter/meals-price-range-filter-form.component";
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
import {BaseEntityStore} from "../../../../../../shared/store/base-entity-store";
import {Meal} from "../../../../../../api/model/meal";
import {MealsFilter} from "../../../../../../api/model/mealsFilter";
import {MealsFiltersContainer} from "../../../../data-access/filters/meals-filters-container";

@Injectable({
  providedIn: 'root'
})
export class MealsFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);

  openPriceRange<TStore extends BaseEntityStore<Meal, MealsFilter, MealsFiltersContainer>>(store: TStore) {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон цін',
        formComponent: MealsPriceRangeFilterFormComponent,
        initialValue: store.filters.priceRange.getRange(),
        submitCallback: (priceRange) => {
          store.filters.priceRange.setRange(priceRange);
          store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openAdditionalPriceRange<TStore extends BaseEntityStore<Meal, MealsFilter, MealsFiltersContainer>>(store: TStore) {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон доданої вартості',
        formComponent: MealsAdditionalPriceRangeFilterFormComponent,
        initialValue: store.filters.additionalPriceRange.getRange(),
        submitCallback: (priceRange) => {
          store.filters.additionalPriceRange.setRange(priceRange);
          store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openWeightRange<TStore extends BaseEntityStore<Meal, MealsFilter, MealsFiltersContainer>>(store: TStore) {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон ваги',
        formComponent: MealsWeightRangeFilterFormComponent,
        initialValue: store.filters.weightRange.getRange(),
        submitCallback: (range) => {
          store.filters.weightRange.setRange(range);
          store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openEnergeticValue<TStore extends BaseEntityStore<Meal, MealsFilter, MealsFiltersContainer>>(store: TStore) {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон енергетичної цінності',
        formComponent: MealsEnergeticValueRangeFilterFormComponent,
        initialValue: store.filters.energeticValueRange.getRange(),
        submitCallback: (range) => {
          store.filters.energeticValueRange.setRange(range);
          store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }
}
