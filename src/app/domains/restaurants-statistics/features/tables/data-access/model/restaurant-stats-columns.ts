import {RestaurantStatistic} from "../../../../../../api/model/restaurantStatistic";
import {
  buildPageTableColumns,
  PageTableColumn
} from "../../../../../../shared/features/reports/data-access/model/page-table-column";

export type RestaurantStatsColumn = keyof Omit<RestaurantStatistic, 'id' | 'managerUserId' | 'isDeleted'>;

export type RestaurantStatsPageTableColumn = PageTableColumn<RestaurantStatsColumn>;

export const RestaurantStatsColumns: Record<RestaurantStatsColumn, RestaurantStatsColumn> = {
  address: 'address',
  managerPassportNumber: 'managerPassportNumber',
  managerSurname: 'managerSurname',
  numberOfOrders: 'numberOfOrders',
  totalOrdersPrice: 'totalOrdersPrice'
} as const;

export const RestaurantStatsPageTableColumns = buildPageTableColumns(RestaurantStatsColumns);
