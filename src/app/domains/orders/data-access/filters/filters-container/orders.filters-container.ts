import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {SearchOrdersFilterModel} from "../filter-models/search-orders.filter-model";
import {ListOrderDto} from "../../types/list-order-dto";

export class OrdersFiltersContainer extends FiltersContainer<ListOrderDto> {
  readonly search = this.addFilterModel(new SearchOrdersFilterModel());
}
