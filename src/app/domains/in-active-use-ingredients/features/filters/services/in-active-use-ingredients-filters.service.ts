import {inject, Injectable} from "@angular/core";
import { BaseRangeStatsFilterService } from "../../../../../shared/features/filters/services/base-range-stats-filter.service";
import {Ingredient} from "../../../../../api/model/ingredient";
import {IngredientsInActiveUseFilter} from "../../../../../api/model/ingredientsInActiveUseFilter";
import {InActiveUseIngredientsFiltersContainer} from "../model/in-active-use-ingredients.filters-container";
import {InActiveUseIngredientsStore} from "../../../data-access/store/in-active-use-ingredients.store";
import {
  InActiveUseIngredientsDateRangeFilterFormComponent
} from "../view/components/in-active-use-ingredients-date-range-filter-form/in-active-use-ingredients-date-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class InActiveUseIngredientsFiltersService extends BaseRangeStatsFilterService<Ingredient, IngredientsInActiveUseFilter, InActiveUseIngredientsFiltersContainer, InActiveUseIngredientsStore> {
  protected override readonly store = inject(InActiveUseIngredientsStore);

  openOrdersDate() {
    this.openRangeForm({
      title: 'Оберіть діапазон дати створення замовлень',
      filter: this.store.filters.dateRange,
      formComponent: InActiveUseIngredientsDateRangeFilterFormComponent
    });
  }
}
