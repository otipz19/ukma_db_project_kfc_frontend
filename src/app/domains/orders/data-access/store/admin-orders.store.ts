import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
import {OrdersFiltersContainer} from "../filters/filters-container/orders.filters-container";
import {forkJoin, map, Observable, of, switchMap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {OrderControllerService} from "../../../../api/api/orderController.service";
import {ListOrderDto} from "../types/list-order-dto";
import {OrderLoadHelperService} from "../services/order-load-helper.service";
import {Order} from "../../../../api/model/order";
import {Restaurant} from "../../../../api/model/restaurant";
import {EmployeeStoreEntity} from "../../../employees/data-access/model/employee-store-entity";
import {ClientStoreEntity} from "../../../clients/data-access/model/client-store-entity";

type JoinedResponse = {
  order: Order,
  restaurant: Restaurant,
  client?: ClientStoreEntity,
  employee?: EmployeeStoreEntity
}

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersStore extends BaseEntityStore<ListOrderDto, OrdersFiltersContainer> {
  private readonly ordersApi = inject(OrderControllerService);
  private readonly orderLoadHelper = inject(OrderLoadHelperService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): OrdersFiltersContainer {
    return new OrdersFiltersContainer();
  }

  protected override getAllFromApi(): Observable<ListOrderDto[]> {
    return this.ordersApi.getOrdersByFilter()
      .pipe(
        switchMap(ordersList => {
          const orders = ordersList.items;
          return forkJoin({
            orders: of(orders),
            restaurants: this.orderLoadHelper.loadRestaurants$(orders.map(o => o.restaurantId)),
            clients: this.orderLoadHelper.loadClients$(orders.map(o => o.clientUserId)),
            employees: this.orderLoadHelper.loadEmployees$(orders.map(o => o.employeeUserId))
          });
        }),
        map(joined => {
          return joined.orders.map(order => {
            return this.buildListOrderDto({
              order: order,
              restaurant: joined.restaurants.find(r => r.id === order.restaurantId)!,
              client: joined.clients.find(c => c.id === order.clientUserId),
              employee: joined.employees.find(e => e.id === order.employeeUserId)
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
            client: this.orderLoadHelper.loadClient$(order.clientUserId),
            employee: this.orderLoadHelper.loadEmployee$(order.employeeUserId)
          });
        }),
        map(joined => {
          return this.buildListOrderDto(joined);
        })
      );
  }

  private buildListOrderDto(joined: JoinedResponse): ListOrderDto {
    return {
      ...joined.order,
      restaurantAddress: joined.restaurant.address,
      clientSurname: joined.client?.surname,
      employeeSurname: joined.employee?.surname
    };
  }
}
