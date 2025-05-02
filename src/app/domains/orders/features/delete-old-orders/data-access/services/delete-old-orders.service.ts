import {inject, Injectable} from "@angular/core";
import {OrderControllerService} from "../../../../../../api/api/orderController.service";
import {NotifyService} from "../../../../../../shared/features/notify/data-access/services/notify.service";
import {Observable, switchMap} from "rxjs";
import {DeleteDialogService} from "../../../../../../shared/features/delete-dialog/services/delete-dialog.service";

export const OLD_ORDERS_DATE_BEFORE_TIMESTAMP = getOldOrdersDateBeforeTimestamp();

function getOldOrdersDateBeforeTimestamp() {
  const today = new Date();
  const daysToSub = 90;
  return today.setDate(today.getDate() - daysToSub);
}

@Injectable({
  providedIn: 'root'
})
export class DeleteOldOrdersService {
  private readonly api = inject(OrderControllerService);
  private readonly notify = inject(NotifyService);
  private readonly deleteDialog = inject(DeleteDialogService);

  deleteOldOrders$(): Observable<number> {
    return this.deleteDialog.confirmDelete$({
      customMessage: 'Ви впевнені, що хочете видалити історію застарілих замовлень?'
    }).pipe(
      switchMap(() => {
        return this.api.clearOrdersHistory({clearBefore: OLD_ORDERS_DATE_BEFORE_TIMESTAMP.toString()})
      }),
      this.notify.notifyHttpRequest()
    );
  }
}
