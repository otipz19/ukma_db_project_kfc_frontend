import {inject} from "@angular/core";
import {UpsertDialogService} from "../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {ContactsStore} from "../store/contacts.store";
import {Observable, tap} from "rxjs";

export abstract class BaseSetContactsService {
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(ContactsStore);

  set(userId: number, contacts: string[]) {
    this.upsertDialog.openUpsert$({
      title: this.getTitle(),
      formComponent: this.getFormComponent(),
      initialValue: contacts,
      submitCallback: (contacts) => {
        return this.request$(userId, contacts)
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

  protected abstract request$(userId: number, contacts: string[]): Observable<any>;

  protected abstract getFormComponent(): any;

  protected abstract getTitle(): string;
}
