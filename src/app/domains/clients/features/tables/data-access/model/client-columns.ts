import {buildPageTableColumns, PageTableColumn} from "../../../../../../shared/features/reports/data-access/model/page-table-column";
import {ClientStoreEntity} from "../../../../data-access/model/client-store-entity";

export type ClientColumn = (keyof Omit<ClientStoreEntity, 'id' | 'username'>);

export const ClientColumns: Record<ClientColumn, ClientColumn> = {
  surname: 'surname',
  firstName: 'firstName',
  middleName: 'middleName',
  birthDate: 'birthDate',
  bonuses: 'bonuses',
};

export type ClientPageTableColumn = PageTableColumn<ClientColumn>;

export const ClientPageTableColumns = buildPageTableColumns(ClientColumns);
