import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {Order} from "../../../../../api/model/order";
import {SearchOrdersFilterModel} from "../filter-models/search-orders.filter-model";

export class OrdersFiltersContainer extends FiltersContainer<Order> {
  readonly search = this.addFilterModel(new SearchOrdersFilterModel());
}
