import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {OrderControllerService} from "../../../../api/api/orderController.service";
import {Order} from "../../../../api/model/order";
import {Restaurant} from "../../../../api/model/restaurant";
import {convertUnixTimestampToDateString} from "../../../../shared/utils/convert-unix-timestamp-to-date-string";
import {OrdersFiltersContainer} from "../../features/filters/data-access/model/orders.filters-container";
import {OrdersFilter} from "../../../../api/model/ordersFilter";

@Injectable({
  providedIn: 'root'
})
export class EmployeeOrdersStore extends BaseEntityStore<Order, OrdersFilter, OrdersFiltersContainer> {
  private readonly ordersApi = inject(OrderControllerService);
  private restaurantId: Restaurant['id'] | undefined;

  readonly $viewList = this.$filteredList;

  setRestaurantId(id: Restaurant['id']) {
    this.restaurantId = id;
  }

  protected override buildFiltersContainer(): OrdersFiltersContainer {
    return new OrdersFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<OrdersFilter>): Observable<Order[]> {
    return this.ordersApi.getOrdersByFilter({restaurantId: this.restaurantId, ...filtersDto})
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
