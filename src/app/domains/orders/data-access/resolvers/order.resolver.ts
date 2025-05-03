import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {Order} from "../../../../api/model/order";
import {inject} from "@angular/core";
import {OrderControllerService} from "../../../../api/api/orderController.service";
import {catchError, EMPTY, map, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {convertUnixTimestampToDateString} from "../../../../shared/utils/convert-unix-timestamp-to-date-string";

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
      tap(order => {
        order.dateCreated = convertUnixTimestampToDateString(order.dateCreated);
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          router.navigate(['/', 'forbidden']);
        }
        router.navigate(['/', 'not-found']);
        return EMPTY;
      })
    );
};
