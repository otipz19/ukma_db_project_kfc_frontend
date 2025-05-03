import {BaseStatsStore} from "../../../../shared/store/base-stats-store";
import {AdventurousClientsFilter} from "../../../../api/model/adventurousClientsFilter";
import {AdventClientsFiltersContainer} from "../../features/filters/data-access/model/advent-clients.filters-container";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {ClientControllerService} from "../../../../api/api/clientController.service";
import {ClientStoreEntity, mapClientToStoreEntity} from "../../../clients/data-access/model/client-store-entity";

@Injectable({
  providedIn: 'root'
})
export class AdventClientsStore extends BaseStatsStore<ClientStoreEntity, AdventurousClientsFilter, AdventClientsFiltersContainer> {
  private readonly api = inject(ClientControllerService);

  protected override buildFiltersContainer(): AdventClientsFiltersContainer {
    return new AdventClientsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<AdventurousClientsFilter>): Observable<ClientStoreEntity[]> {
    return this.api.getAdventurousClients({...filterDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          return list.items.map(c => mapClientToStoreEntity(c));
        })
      )
  }
}
