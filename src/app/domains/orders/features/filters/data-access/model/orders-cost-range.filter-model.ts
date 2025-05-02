import {OrdersFilter} from "../../../../../../api/model/ordersFilter";
import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type OrdersCostRangeFilterDto = Pick<OrdersFilter, 'minCost' | 'maxCost'>;

export class OrdersCostRangeFilterModel extends RangeFilterModel<OrdersFilter, OrdersCostRangeFilterDto> {

}
