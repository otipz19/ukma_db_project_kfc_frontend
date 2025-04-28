import {EmployeeColumn} from "./employee-columns";

export const EmployeeTableHeaderMapper: Record<EmployeeColumn, string> = {
  passportNumber: 'Номер паспорту',
  surname: 'Прізвище',
  firstName: "Ім'я",
  middleName: 'По-батькові',
  birthDate: 'Дата народження',
  position: 'Посада',
  salary: 'Заробітна плата'
} as const;
