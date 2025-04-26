import {FiltersContainer} from "../../../../../shared/features/filters/model/filters-container";
import {SearchClientsFilterModel} from "../filter-models/search-clients.filter-model";
import {ClientStoreEntity} from "../../model/client-store-entity";

export class ClientsFiltersContainer extends FiltersContainer<ClientStoreEntity> {
  readonly search = this.addFilterModel(new SearchClientsFilterModel());
}
