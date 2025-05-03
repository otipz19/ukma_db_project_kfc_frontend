import {inject, Injectable} from "@angular/core";
import {
  BaseRangeStatsFilterService
} from "../../../../../../shared/features/filters/services/base-range-stats-filter.service";
import {ClientStoreEntity} from "../../../../../clients/data-access/model/client-store-entity";
import {AdventurousClientsFilter} from "../../../../../../api/model/adventurousClientsFilter";
import {AdventClientsFiltersContainer} from "../model/advent-clients.filters-container";
import {AdventClientsStore} from "../../../../data-access/store/advent-clients.store";
import {
  AdventClientsPriceRangeFilterFormComponent
} from "../../view/components/advent-clients-price-range-filter-form/advent-clients-price-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class AdventClientsFiltersService extends BaseRangeStatsFilterService<ClientStoreEntity, AdventurousClientsFilter, AdventClientsFiltersContainer, AdventClientsStore> {
  protected override readonly store = inject(AdventClientsStore);

  openPrice() {
    this.openRangeForm({
      title: 'Оберіть діапазон ціни страв, що замовляли активні клієнти',
      filter: this.store.filters.price,
      formComponent: AdventClientsPriceRangeFilterFormComponent
    });
  }
}
