import {inject, Injectable} from "@angular/core";
import {RestaurantsStatsStore} from "../../../../data-access/store/restaurants-stats.store";
import {
  RestaurantsStatsOrderNumberRangeFilterFormComponent
} from "../../view/components/restaurants-stats-orders-number-range-filter-form/restaurants-stats-order-number-range-filter-form.component";
import {
  RestaurantsStatsTotalOrdersPriceRangeFilterFormComponent
} from "../../view/components/restaurants-stats-total-orders-price-range-filter-form/restaurants-stats-total-orders-price-range-filter-form.component";
import {
  BaseRangeStatsFilterService
} from "../../../../../../shared/features/filters/services/base-range-stats-filter.service";
import {RestaurantStatistic} from "../../../../../../api/model/restaurantStatistic";
import {RestaurantsStatsFiltersContainer} from "../model/restaurants-stats.filters-container";
import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";
import {
  RestaurantsStatsOrdersDateRangeFilterFormComponent
} from "../../view/components/restaurants-stats-orders-date-range-filter-form/restaurants-stats-orders-date-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsStatsFiltersService extends BaseRangeStatsFilterService<RestaurantStatistic, RestaurantsStatisticFilter, RestaurantsStatsFiltersContainer, RestaurantsStatsStore> {
  protected override readonly store = inject(RestaurantsStatsStore);

  openOrdersNumber() {
    this.openRangeForm({
      title: 'Оберіть діапазон кількості замовлень',
      filter: this.store.filters.ordersNumber,
      formComponent: RestaurantsStatsOrderNumberRangeFilterFormComponent
    });
  }

  openTotalOrdersPrice() {
    this.openRangeForm({
      title: 'Оберіть діапазон сумарної вартості замовлень',
      filter: this.store.filters.totalOrdersPrice,
      formComponent: RestaurantsStatsTotalOrdersPriceRangeFilterFormComponent
    });
  }

  openOrdersDate() {
    this.openRangeForm({
      title: 'Оберіть діапазон дати створення замовлень',
      filter: this.store.filters.ordersDate,
      formComponent: RestaurantsStatsOrdersDateRangeFilterFormComponent
    });
  }
}
