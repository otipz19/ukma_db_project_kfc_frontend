// import {BaseEntityStore} from "../../../../shared/store/base-entity-store";
// import {OrdersFiltersContainer} from "../filters/filters-container/orders.filters-container";
// import {Order} from "../../../../api/model/order";
// import { Observable } from "rxjs";
// import {inject} from "@angular/core";
// import {OrderControllerService} from "../../../../api/api/orderController.service";
//
// export class OrdersStore extends BaseEntityStore<Order, OrdersFiltersContainer> {
//   private readonly ordersApi = inject(OrderControllerService);
//
//   protected override buildFiltersContainer(): OrdersFiltersContainer {
//     return new OrdersFiltersContainer();
//   }
//
//     protected override getAllFromApi(): Observable<Order[]> {
//     // return this.ordersApi.getAllOrders();
//   }
//
//   protected override getByIdFromApi(id: number): Observable<Order> {
//     return this.ordersApi.getOrderById(id);
//   }
// }
