import {OrderColumn} from "./order-columns";

export const OrderTableHeaderMapper: Record<OrderColumn, string> = {
  id: 'Номер',
  restaurantAddress: 'Ресторан',
  employeeSurname: 'Працівник',
  clientSurname: 'Клієнт',
  dateCreated: 'Дата створення',
  cost: 'Вартість',
  isCompleted: 'Статус',
} as const;
