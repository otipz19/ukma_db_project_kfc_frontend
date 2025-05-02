import {OrdersFilter} from "../../../../../../api/model/ordersFilter";
import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type OrdersDateCreatedRangeFilterDto = Pick<OrdersFilter, 'minDateCreated' | 'maxDateCreated'>;

export class OrdersDateCreatedRangeFilterModel extends RangeFilterModel<OrdersFilter, OrdersDateCreatedRangeFilterDto> {

}
