import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {of} from "rxjs";
import {
  MealsPriceRangeFilterFormComponent
} from "../../../../../meals/features/filters/view/components/meals-price-filter/meals-price-range-filter-form.component";
import {
  MealsWeightRangeFilterFormComponent
} from "../../../../../meals/features/filters/view/components/meals-weight-range-filter-form/meals-weight-range-filter-form.component";
import {
  MealsEnergeticValueRangeFilterFormComponent
} from "../../../../../meals/features/filters/view/components/meals-energetic-value-range-filter-form/meals-energetic-value-range-filter-form.component";
import {BaseEntityStore} from "../../../../../../shared/store/base-entity-store";
import {Ingredient} from "../../../../../../api/model/ingredient";
import {IngredientsFilter} from "../../../../../../api/model/ingredientsFilter";
import {IngredientsFiltersContainer} from "../../../../data-access/filters/ingredients.filters-container";

@Injectable({
  providedIn: 'root'
})
export class IngredientsFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);

  openPriceRange<TStore extends BaseEntityStore<Ingredient, IngredientsFilter, IngredientsFiltersContainer>>(store: TStore) {
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

  openWeightRange<TStore extends BaseEntityStore<Ingredient, IngredientsFilter, IngredientsFiltersContainer>>(store: TStore) {
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

  openEnergeticValue<TStore extends BaseEntityStore<Ingredient, IngredientsFilter, IngredientsFiltersContainer>>(store: TStore) {
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
