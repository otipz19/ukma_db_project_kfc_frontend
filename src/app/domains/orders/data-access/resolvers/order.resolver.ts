import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {Order} from "../../../../api/model/order";
import {inject} from "@angular/core";
import {OrderControllerService} from "../../../../api/api/orderController.service";
import {catchError, EMPTY} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export const ORDER_RESOLVER_KEY = 'ORDER_RESOLVER_KEY';

export const orderResolver: ResolveFn<Order> = (route, state) => {
  const router = inject(Router);

  const orderId = Number(route.paramMap.get('orderId'));
  if (isNaN(orderId)) {
    return new RedirectCommand(router.parseUrl('not-found'));
  }

  const orderApi = inject(OrderControllerService);

  return orderApi.getOrderById(orderId)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          router.navigate(['/', 'forbidden']);
        }
        router.navigate(['/', 'not-found']);
        return EMPTY;
      })
    );
};
