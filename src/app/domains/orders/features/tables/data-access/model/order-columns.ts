import {buildPageTableColumns, PageTableColumn} from "../../../../../../shared/features/reports/data-access/model/page-table-column";
import {ListOrderDto} from "../../../../data-access/types/list-order-dto";

export type OrderColumn = keyof Omit<ListOrderDto, 'employeeUserId' | 'clientUserId' | 'restaurantId'>;

export type OrderPageTableColumn = PageTableColumn<OrderColumn>;

export const OrderColumns: Record<OrderColumn, OrderColumn> = {
  id: 'id',
  restaurantAddress: 'restaurantAddress',
  employeeSurname: 'employeeSurname',
  clientSurname: 'clientSurname',
  dateCreated: 'dateCreated',
  cost: 'cost',
  isCompleted: 'isCompleted',
};

export const ClientOrderColumns: Partial<Record<OrderColumn, OrderColumn>> = {
  id: 'id',
  restaurantAddress: 'restaurantAddress',
  dateCreated: 'dateCreated',
  cost: 'cost',
  isCompleted: 'isCompleted',
};

export const OrderPageTableColumns = buildPageTableColumns(OrderColumns);

export const AdminOrderColumnsArray = Object.values(OrderColumns);
export const AdminOrderDisplayedColumnsArray = Object.values(OrderPageTableColumns);

export const ClientOrderColumnsArray = Object.values(ClientOrderColumns);
export const ClientPageTableColumns = buildPageTableColumns(ClientOrderColumns);
export const ClientOrderDisplayedColumnsArray = Object.values(ClientPageTableColumns) as OrderPageTableColumn[];
