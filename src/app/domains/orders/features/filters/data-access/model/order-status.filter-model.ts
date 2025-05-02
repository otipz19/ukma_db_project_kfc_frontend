import {ServerSideFilterModel} from "../../../../../../shared/features/filters/model/server-side-filter-model";
import {OrdersFilter} from "../../../../../../api/model/ordersFilter";

export enum OrderStatus {
  COMPLETE = 'COMPLETE',
  IN_PROCESS = 'IN_PROCESS'
}

export class OrdersStatusFilterModel implements ServerSideFilterModel<OrdersFilter> {
  private readonly statusValues = Object.values(OrderStatus);

  private readonly statusMap= new Map<OrderStatus, boolean>([
    [OrderStatus.COMPLETE, true],
    [OrderStatus.IN_PROCESS, true]
  ]);

  toggleStatus(status: OrderStatus) {
    this.statusMap.set(status, !this.statusMap.get(status));
  }

  getFilterDtoPart(): Partial<OrdersFilter> {
    const allTrue = this.getAllTrue();
    if(allTrue.length !== 1) {
      return {};
    }
    if(allTrue[0] === OrderStatus.COMPLETE) {
      return {isCompleted: true};
    }
    return {isCompleted: false};
  }

  hasFilter(): boolean {
    return this.getAllTrue().length > 0;
  }

  cleanFilter(): void {
    for(const status of this.statusValues) {
      this.statusMap.set(status, false);
    }
  }

  private getAllTrue(): Array<OrderStatus> {
    const result: OrderStatus[] = [];
    for (const status of this.statusValues) {
      if (this.statusMap.get(status)) {
        result.push(status);
      }
    }
    return result;
  }
}
