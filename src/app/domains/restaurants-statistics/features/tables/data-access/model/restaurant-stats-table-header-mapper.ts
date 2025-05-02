import {RestaurantStatsPageTableColumn} from "./restaurant-stats-columns";

export const RestaurantStatsTableHeaderMapper: Record<RestaurantStatsPageTableColumn, string> = {
  address: 'Адреса',
  totalOrdersPrice: 'Сума всіх замовлень',
  numberOfOrders: 'Кількість замовлень',
  managerSurname: 'Прізвище менеджера',
  managerPassportNumber: 'Номер паспорта менеджера',
  actions: 'Дії'
} as const;
