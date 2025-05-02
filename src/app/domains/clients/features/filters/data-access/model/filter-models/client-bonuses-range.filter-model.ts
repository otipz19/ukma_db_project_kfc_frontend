import {RangeFilterModel} from "../../../../../../../shared/features/filters/generic-filters/range-filter-model";
import {ClientsFilter} from "../../../../../../../api/model/clientsFilter";

export type ClientBonusesRangeFilterDto = Pick<ClientsFilter, 'minBonuses' | 'maxBonuses'>;

export class ClientBonusesRangeFilterModel extends RangeFilterModel<ClientsFilter, ClientBonusesRangeFilterDto> {

}
