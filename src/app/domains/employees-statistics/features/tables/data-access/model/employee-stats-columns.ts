import {EmployeeStatistic} from "../../../../../../api/model/employeeStatistic";
import {
  buildPageTableColumns,
  PageTableColumn
} from "../../../../../../shared/features/reports/data-access/model/page-table-column";

export type EmployeeStatsColumn = keyof Omit<EmployeeStatistic, 'userId' | 'restaurantId'>;

export type EmployeeStatsPageTableColumn = PageTableColumn<EmployeeStatsColumn>;

export const EmployeeStatsColumns: Record<EmployeeStatsColumn, EmployeeStatsColumn> = {
  passportNumber: 'passportNumber',
  numberOfOrders: 'numberOfOrders',
  totalOrdersPrice: 'totalOrdersPrice',
  position: 'position',
  surname: 'surname',
  restaurantAddress: 'restaurantAddress'
} as const;

export const EmployeeStatsPageTableColumns = buildPageTableColumns(EmployeeStatsColumns);
