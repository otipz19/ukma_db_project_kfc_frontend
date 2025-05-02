import {ClientsFilter} from "../../../../../../../api/model/clientsFilter";
import {RangeFilterModel} from "../../../../../../../shared/features/filters/generic-filters/range-filter-model";

export type ClientBirthDateRangeFilterDto = Pick<ClientsFilter, 'minBirthDate' | 'maxBirthDate'>;

export class ClientBirthDateRangeFilterModel extends RangeFilterModel<ClientsFilter, ClientBirthDateRangeFilterDto> {

}
