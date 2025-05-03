import {inject, Injectable} from "@angular/core";
import {
  BaseRangeStatsFilterService
} from "../../../../../../shared/features/filters/services/base-range-stats-filter.service";
import {MealStatistic} from "../../../../../../api/model/mealStatistic";
import {MealsStatisticFilter} from "../../../../../../api/model/mealsStatisticFilter";
import {MealStatsFiltersContainer} from "../model/meal-stats.filters-container";
import {MealStatsStore} from "../../../../data-access/store/meal-stats.store";
import {
  MealStatsClientMealsRangeFilterFormComponent
} from "../../view/components/meal-stats-client-meals-range-filter-form/meal-stats-client-meals-range-filter-form.component";
import {
  MealStatsLastOrderedRangeFilterFormComponent
} from "../../view/components/meal-stats-last-ordered-range-filter-form/meal-stats-last-ordered-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class MealStatsFiltersService extends BaseRangeStatsFilterService<MealStatistic, MealsStatisticFilter, MealStatsFiltersContainer, MealStatsStore> {
  protected override readonly store = inject(MealStatsStore);

  openClientMeals() {
    this.openRangeForm({
      title: 'Оберіть діапазон кількості клієнтських страв',
      filter: this.store.filters.clientMeals,
      formComponent: MealStatsClientMealsRangeFilterFormComponent
    });
  }

  openLastOrdered() {
    this.openRangeForm({
      title: 'Оберіть діапазон дати останнього замовлення',
      filter: this.store.filters.lastOrdered,
      formComponent: MealStatsLastOrderedRangeFilterFormComponent
    });
  }
}
