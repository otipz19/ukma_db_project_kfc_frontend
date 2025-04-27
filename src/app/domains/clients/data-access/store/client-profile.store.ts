import {inject, Injectable, signal} from "@angular/core";
import {ClientStoreEntity, mapClientToStoreEntity} from "../model/client-store-entity";
import {catchError, EMPTY, map, Observable, switchMap, tap} from "rxjs";
import {UserPhonesControllerService} from "../../../../api/api/userPhonesController.service";
import {UserEmailsControllerService} from "../../../../api/api/userEmailsController.service";
import {ClientControllerService} from "../../../../api/api/clientController.service";

@Injectable({
  providedIn: 'root'
})
export class ClientProfileStore {
  private readonly clientApi = inject(ClientControllerService);
  private readonly phoneApi = inject(UserPhonesControllerService);
  private readonly emailApi = inject(UserEmailsControllerService);

  private readonly $clientInner = signal<ClientStoreEntity | undefined>(undefined);
  private readonly $phonesInner = signal<string[]>([]);
  private readonly $emailsInner = signal<string[]>([]);

  readonly $client = this.$clientInner.asReadonly();
  readonly $phones = this.$phonesInner.asReadonly();
  readonly $emails = this.$emailsInner.asReadonly();

  reloadClientData() {
    const id = this.$clientInner()?.id;
    if (!id) {
      return;
    }
    this.loadClient(id).subscribe();
  }

  load(id: ClientStoreEntity['id']) {
    this.loadClient(id)
      .pipe(
        switchMap(() => {
          return this.requestContacts(
            this.emailApi.getUserEmails(id)
          );
        }),
        tap(emails => {
          this.$emailsInner.set(emails);
        }),
        switchMap(() => {
          return this.requestContacts(
            this.phoneApi.getUserPhones(id)
          );
        }),
        tap(phones => {
          this.$phonesInner.set(phones);
        })
      )
      .subscribe();
  }

  private loadClient(id: ClientStoreEntity['id']): Observable<ClientStoreEntity> {
    return this.clientApi.getClientByUserId(id)
      .pipe(
        catchError(() => {
          this.$clientInner.set(undefined);
          this.$phonesInner.set([]);
          this.$emailsInner.set([]);
          return EMPTY;
        }),
        map(client => mapClientToStoreEntity(client)),
        tap(client => {
          this.$clientInner.set(client);
        })
      );
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
