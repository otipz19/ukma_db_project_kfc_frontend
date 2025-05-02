import {inject, Injectable} from "@angular/core";
import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {ListOrderDto} from "../types/list-order-dto";
import {OrderControllerService} from "../../../../api/api/orderController.service";
import {OrderLoadHelperService} from "../services/order-load-helper.service";
import {forkJoin, map, Observable, of, switchMap} from "rxjs";
import {Order} from "../../../../api/model/order";
import {Restaurant} from "../../../../api/model/restaurant";
import {ClientStoreEntity} from "../../../clients/data-access/model/client-store-entity";
import {convertUnixTimestampToDateString} from "../../../../shared/utils/convert-unix-timestamp-to-date-string";
import {OrdersFilter} from "../../../../api/model/ordersFilter";
import {OrdersFiltersContainer} from "../../features/filters/data-access/model/orders.filters-container";

type JoinedResponse = {
  order: Order,
  restaurant: Restaurant,
}

@Injectable({
  providedIn: 'root'
})
export class ClientOrdersStore extends BaseEntityStore<ListOrderDto, OrdersFilter, OrdersFiltersContainer> {
  private readonly ordersApi = inject(OrderControllerService);
  private readonly orderLoadHelper = inject(OrderLoadHelperService);
  private clientId: ClientStoreEntity['id'] | undefined;

  readonly $viewList = this.$filteredList;

  setClientId(id: ClientStoreEntity['id']) {
    this.clientId = id;
  }

  protected override buildFiltersContainer(): OrdersFiltersContainer {
    return new OrdersFiltersContainer();
  }

  protected override getAllFromApi(filtersDto: Partial<OrdersFilter>): Observable<ListOrderDto[]> {
    return this.ordersApi.getOrdersByFilter({clientUserId: this.clientId, ...filtersDto})
      .pipe(
        switchMap(ordersList => {
          const orders = ordersList.items;
          return forkJoin({
            orders: of(orders),
            restaurants: this.orderLoadHelper.loadRestaurants$(orders.map(o => o.restaurantId)),
          });
        }),
        map(joined => {
          return joined.orders.map(order => {
            return this.buildListOrderDto({
              order: order,
              restaurant: joined.restaurants.find(r => r.id === order.restaurantId)!,
            })
          })
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<ListOrderDto> {
    return this.ordersApi.getOrderById(id)
      .pipe(
        switchMap(order => {
          return forkJoin({
            order: of(order),
            restaurant: this.orderLoadHelper.loadRestaurant$(order.restaurantId),
          });
        }),
        map(joined => {
          return this.buildListOrderDto(joined);
        })
      );
  }

  private buildListOrderDto(joined: JoinedResponse): ListOrderDto {
    joined.order.dateCreated = convertUnixTimestampToDateString(joined.order.dateCreated);
    return {
      ...joined.order,
      restaurantAddress: joined.restaurant.address,
    };
  }
}
