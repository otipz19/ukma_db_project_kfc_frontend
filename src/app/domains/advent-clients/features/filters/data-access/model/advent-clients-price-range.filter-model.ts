import {AdventurousClientsFilter} from "../../../../../../api/model/adventurousClientsFilter";
import {RangeFilterModel} from "../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type AdventClientsPriceRangeFilterDto = Pick<AdventurousClientsFilter, 'minPrice' | 'maxPrice'>;

export class AdventClientsPriceRangeFilterModel extends RangeFilterModel<AdventurousClientsFilter, AdventClientsPriceRangeFilterDto> {

}
