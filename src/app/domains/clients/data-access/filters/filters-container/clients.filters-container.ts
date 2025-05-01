import {SearchClientsFilterModel} from "../filter-models/search-clients.filter-model";
import {ServerSideFiltersContainer} from "../../../../../shared/features/filters/model/server-side-filters-container";
import {ClientsFilter} from "../../../../../api/model/clientsFilter";

export class ClientsFiltersContainer extends ServerSideFiltersContainer<ClientsFilter> {
  readonly search = this.addFilterModel(new SearchClientsFilterModel());
}
