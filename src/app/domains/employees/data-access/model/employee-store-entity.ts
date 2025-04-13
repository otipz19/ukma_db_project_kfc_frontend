import {Employee} from "../../../../api";

export type EmployeeStoreEntity = Omit<Employee, 'userId'> & {id: number};

export function mapEmployeeToStoreEntity(employee: Employee): EmployeeStoreEntity {
  const {userId, ...rest} = employee;
  return {id: userId, ...rest};
}
