import {OrdersFilter} from "../../../../../../api/model/ordersFilter";
import {ToggleableFilterModel} from "../../../../../../shared/features/filters/generic-filters/toggleable-filter-model";
import {
  OLD_ORDERS_DATE_BEFORE_TIMESTAMP
} from "../../../delete-old-orders/data-access/services/delete-old-orders.service";

export type OldOrdersFilterDto = Pick<OrdersFilter, 'maxDateCreated'>;

export class OldOrdersFilterModel extends ToggleableFilterModel<OrdersFilter> {
  override getFilterDtoPart(): Partial<OrdersFilter> {
    // @ts-ignore
    return {maxDateCreated: new Date(OLD_ORDERS_DATE_BEFORE_TIMESTAMP)};
  }

  protected override doHasFilter(): boolean {
    return true;
  }

  protected override doCleanFilter(): void {

  }
}
