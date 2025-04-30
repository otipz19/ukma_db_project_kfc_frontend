import {Component, signal} from '@angular/core';
import {getFromResolver} from "../../../../../shared/resolvers/get-from-resolver";
import {ORDER_RESOLVER_KEY} from "../../../data-access/resolvers/order.resolver";
import {Order} from "../../../../../api/model/order";

@Component({
  selector: 'app-order-view-page',
  imports: [],
  templateUrl: './order-view-page.component.html',
  styleUrl: './order-view-page.component.scss'
})
export class OrderViewPageComponent {
  protected readonly $order = signal(getFromResolver<Order>(ORDER_RESOLVER_KEY));


}
