import {EmployeeStoreEntity} from "../../../../data-access/model/employee-store-entity";
import {buildPageTableColumns, PageTableColumn} from "./page-table-column";

export type EmployeeColumn = (keyof Omit<EmployeeStoreEntity, 'id' | 'username' | 'restaurantId' | 'managerUserId'>);

export type EmployeePageTableColumn = PageTableColumn<EmployeeColumn>;

export const EmployeeColumns: Record<EmployeeColumn, EmployeeColumn> = {
  passportNumber: 'passportNumber',
  surname: 'surname',
  firstName: 'firstName',
  middleName: 'middleName',
  salary: 'salary',
  birthDate: 'birthDate',
  position: 'position',
};

export const EmployeePageTableColumns = buildPageTableColumns(EmployeeColumns);
