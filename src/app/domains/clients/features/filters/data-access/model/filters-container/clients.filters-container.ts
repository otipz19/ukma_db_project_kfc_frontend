import {SearchClientsFilterModel} from "../filter-models/search-clients.filter-model";
import {
  ServerSideFiltersContainer
} from "../../../../../../../shared/features/filters/model/server-side-filters-container";
import {ClientsFilter} from "../../../../../../../api/model/clientsFilter";
import {ClientBonusesRangeFilterModel} from "../filter-models/client-bonuses-range.filter-model";
import {ClientBirthDateRangeFilterModel} from "../filter-models/client-birth-date-range.filter-model";

export class ClientsFiltersContainer extends ServerSideFiltersContainer<ClientsFilter> {
  readonly search = this.addFilterModel(new SearchClientsFilterModel());
  readonly bonuses = this.addFilterModel(new ClientBonusesRangeFilterModel());
  readonly birthDate = this.addFilterModel(new ClientBirthDateRangeFilterModel());
}
