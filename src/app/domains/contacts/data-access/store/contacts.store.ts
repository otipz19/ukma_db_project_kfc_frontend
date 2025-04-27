import {inject, Injectable, signal} from "@angular/core";
import {UserPhonesControllerService} from "../../../../api/api/userPhonesController.service";
import {UserEmailsControllerService} from "../../../../api/api/userEmailsController.service";
import {catchError, EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactsStore {
  private readonly phoneApi = inject(UserPhonesControllerService);
  private readonly emailApi = inject(UserEmailsControllerService);

  private readonly $phonesInner = signal<string[]>([]);
  private readonly $emailsInner = signal<string[]>([]);

  readonly $phones = this.$phonesInner.asReadonly();
  readonly $emails = this.$emailsInner.asReadonly();

  load(userId: number) {
    this.requestContacts(
      this.emailApi.getUserEmails(userId)
    ).subscribe(emails => {
      this.$emailsInner.set(emails);
    });

    return this.requestContacts(
      this.phoneApi.getUserPhones(userId)
    ).subscribe(phones => {
      this.$phonesInner.set(phones);
    });
  }

  private requestContacts(request: Observable<string[]>): Observable<string[]> {
    return request
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      );
  }
}
