import {inject, Injectable} from "@angular/core";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {OrderControllerService} from "../../../../api/api/orderController.service";
import {map, Observable} from "rxjs";
import {Order} from "../../../../api/model/order";
import {ClientStoreEntity} from "../../../clients/data-access/model/client-store-entity";
import {convertUnixTimestampToDateString} from "../../../../shared/utils/convert-unix-timestamp-to-date-string";
import {OrdersFilter} from "../../../../api/model/ordersFilter";
import {OrdersFiltersContainer} from "../../features/filters/data-access/model/orders.filters-container";

@Injectable({
  providedIn: 'root'
})
export class ClientOrdersStore extends BaseEntityStore<Order, OrdersFilter, OrdersFiltersContainer> {
  private readonly ordersApi = inject(OrderControllerService);
  private clientId: ClientStoreEntity['id'] | undefined;

  readonly $viewList = this.$filteredList;

  setClientId(id: ClientStoreEntity['id']) {
    this.clientId = id;
  }

  protected override buildFiltersContainer(): OrdersFiltersContainer {
    return new OrdersFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<OrdersFilter>): Observable<Order[]> {
    return this.ordersApi.getOrdersByFilter({clientUserId: this.clientId, ...filtersDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          for(const order of list.items) {
            order.dateCreated = convertUnixTimestampToDateString(order.dateCreated);
          }
          return list.items;
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<Order> {
    return this.ordersApi.getOrderById(id)
      .pipe(
        map(order => {
          order.dateCreated = convertUnixTimestampToDateString(order.dateCreated);
          return order;
        })
      );
  }
}
