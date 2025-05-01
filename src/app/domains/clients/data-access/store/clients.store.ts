import {BaseEntityStore, StoreSort} from "../../../../shared/store/base-entity-store";
import {ClientsFiltersContainer} from "../filters/filters-container/clients.filters-container";
import {map, Observable} from "rxjs";
import {ClientStoreEntity, mapClientToStoreEntity} from "../model/client-store-entity";
import {inject, Injectable} from "@angular/core";
import {ClientControllerService} from "../../../../api/api/clientController.service";

@Injectable({
  providedIn: 'root'
})
export class ClientsStore extends BaseEntityStore<ClientStoreEntity, ClientsFiltersContainer> {
  private readonly api = inject(ClientControllerService);

  readonly $viewList = this.$filteredList;

  protected override buildFiltersContainer(): ClientsFiltersContainer {
    return new ClientsFiltersContainer();
  }

  protected override getAllFromApi(sort?: StoreSort): Observable<ClientStoreEntity[]> {
    return this.api.getClientsByFilter({...sort})
      .pipe(
        map(list => {
          return list.items.map(c => mapClientToStoreEntity(c));
        })
      );
  }

  protected override getByIdFromApi(id: number): Observable<ClientStoreEntity> {
    return this.api.getClientByUserId(id)
      .pipe(
        map(client => {
          return mapClientToStoreEntity(client);
        })
      );
  }
}
