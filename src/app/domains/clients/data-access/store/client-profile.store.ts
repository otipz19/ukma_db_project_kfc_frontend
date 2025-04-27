import {inject, Injectable, signal} from "@angular/core";
import {ClientStoreEntity, mapClientToStoreEntity} from "../model/client-store-entity";
import {catchError, EMPTY, map, Observable, tap} from "rxjs";
import {ClientControllerService} from "../../../../api/api/clientController.service";

@Injectable({
  providedIn: 'root'
})
export class ClientProfileStore {
  private readonly clientApi = inject(ClientControllerService);

  private readonly $clientInner = signal<ClientStoreEntity | undefined>(undefined);
  readonly $client = this.$clientInner.asReadonly();

  reloadClientData() {
    const id = this.$clientInner()?.id;
    if (!id) {
      return;
    }
    this.loadClient(id).subscribe();
  }

  load(client: ClientStoreEntity) {
    this.$clientInner.set(client);
  }

  private loadClient(id: ClientStoreEntity['id']): Observable<ClientStoreEntity> {
    return this.clientApi.getClientByUserId(id)
      .pipe(
        catchError(() => {
          this.$clientInner.set(undefined);
          return EMPTY;
        }),
        map(client => mapClientToStoreEntity(client)),
        tap(client => {
          this.$clientInner.set(client);
        })
      );
  }
}
