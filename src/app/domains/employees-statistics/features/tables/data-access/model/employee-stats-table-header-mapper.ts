import {EmployeeStatsPageTableColumn} from "./employee-stats-columns";

export const EmployeeStatsTableHeaderMapper: Record<EmployeeStatsPageTableColumn, string> = {
  restaurantAddress: 'Адреса ресторану',
  surname: 'Прізвище',
  totalOrdersPrice: 'Сумарна вартість замовлень',
  numberOfOrders: 'Кількість замовлень',
  actions: 'Дії',
  position: 'Посада',
  passportNumber: 'Номер паспорту'
} as const;
