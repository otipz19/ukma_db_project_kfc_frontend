import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {NotifyService} from "../../../../../../shared/features/notify/data-access/services/notify.service";
import {ClientControllerService} from "../../../../../../api/api/clientController.service";
import {ClientStoreEntity} from "../../../../data-access/model/client-store-entity";
import {
  UpdateClientDataFormComponent
} from "../../view/components/update-client-data-form/update-client-data-form.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {
  private readonly api = inject(ClientControllerService);
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);

  update$(client: ClientStoreEntity): Observable<void> {
    const {surname, firstName, middleName, birthDate} = client;

    return this.upsertDialog.openUpsert$({
      title: 'Редагування даних клієнта',
      formComponent: UpdateClientDataFormComponent,
      initialValue: {surname, firstName, middleName, birthDate},
      submitCallback: updated => {
        return this.api.updateClientByUserId(client.id, updated)
          .pipe(
            this.notify.notifyHttpRequest()
          )
      }
    });
  }
}
