import {ServerSideFiltersContainer} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {OrdersFilter} from "../../../../../../api/model/ordersFilter";
import {OrdersCostRangeFilterModel} from "./orders-cost-range.filter-model";
import {OrdersDateCreatedRangeFilterModel} from "./orders-date-created-range-filter.model";

export class OrdersFiltersContainer extends ServerSideFiltersContainer<OrdersFilter> {
  readonly cost = this.addFilterModel(new OrdersCostRangeFilterModel());
  readonly dateCreated = this.addFilterModel(new OrdersDateCreatedRangeFilterModel());
}
