import {inject, Injectable} from "@angular/core";
import {DeleteDialogService} from "../../../../../../shared/features/delete-dialog/services/delete-dialog.service";
import {NotifyService} from "../../../../../../shared/features/notify/data-access/services/notify.service";
import {Observable, switchMap} from "rxjs";
import {ClientControllerService} from "../../../../../../api/api/clientController.service";
import {ClientsStore} from "../../../../data-access/store/clients.store";
import {ClientStoreEntity} from "../../../../data-access/model/client-store-entity";
import {voidOperator} from "../../../../../../shared/rxjs/operators/void-operator";

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {
  private readonly deleteDialog = inject(DeleteDialogService);
  private readonly api = inject(ClientControllerService);
  private readonly store = inject(ClientsStore);
  private readonly notify = inject(NotifyService);

  deleteClient(client: ClientStoreEntity) {
    this.deleteClient$(client)
      .subscribe(() => {
        this.store.remove(client.id);
      });
  }

  deleteClient$(client: ClientStoreEntity): Observable<void> {
    return this.deleteDialog.confirmDelete$({
      entityTypeName: 'клієнта',
      entityInstanceName: `${client.surname} ${client.firstName}`
    })
      .pipe(
        switchMap(() => {
          return this.api.deleteClientByUserId(client.id);
        }),
        this.notify.notifyHttpRequest(),
        voidOperator()
      );
  }
}
