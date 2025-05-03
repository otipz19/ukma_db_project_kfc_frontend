import {
  ServerSideFiltersContainer
} from "../../../../../../shared/features/filters/model/server-side-filters-container";
import {AdventurousClientsFilter} from "../../../../../../api/model/adventurousClientsFilter";
import {AdventClientsPriceRangeFilterModel} from "./advent-clients-price-range.filter-model";

export class AdventClientsFiltersContainer extends ServerSideFiltersContainer<AdventurousClientsFilter> {
  readonly price = this.addFilterModel(new AdventClientsPriceRangeFilterModel());
}
