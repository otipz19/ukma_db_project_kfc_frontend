import {ClientColumn} from "./client-columns";

export const ClientTableHeaderMapper: Record<ClientColumn, string> = {
  surname: 'Прізвище',
  firstName: "Ім'я",
  middleName: 'По-батькові',
  birthDate: 'Дата народження',
  bonuses: 'Бонуси'
} as const;
