import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {ContactsStore} from "../store/contacts.store";
import {tap} from "rxjs";
import {SetEmailsFormComponent} from "../../view/components/set-emails-form/set-emails-form.component";
import {UserEmailsControllerService} from "../../../../api/api/userEmailsController.service";

@Injectable({
  providedIn: 'root'
})
export class SetEmailsService {
  private readonly api = inject(UserEmailsControllerService);
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(ContactsStore);

  set(userId: number, emails: string[]) {
    this.upsertDialog.openUpsert$({
      title: 'Редагування електронної пошти',
      formComponent: SetEmailsFormComponent,
      initialValue: emails,
      submitCallback: (emails) => {
        return this.api.setUserEmails(userId, emails)
          .pipe(
            this.notify.notifyHttpRequest(),
            tap(() => {
              this.store.load(userId);
            })
          )
      }
    })
      .subscribe();
  }
}
