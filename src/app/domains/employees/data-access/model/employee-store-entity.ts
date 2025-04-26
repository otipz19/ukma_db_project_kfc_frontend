import {Employee} from "../../../../api/model/employee";

export type EmployeeStoreEntity = Omit<Employee, 'userId'> & { id: number };

export function mapEmployeeToStoreEntity(employee: Employee): EmployeeStoreEntity {
  let {userId, birthDate, ...rest} = employee;
  // This is a workaround because for some reason backend actually sends [year, month, day] not a string
  birthDate = mapDateFromArrayResponse(birthDate as any);
  return {id: userId, birthDate, ...rest};
}

export function mapDateFromArrayResponse(arrDate: [number, number, number]): string {
  const dateObj = new Date(arrDate[0], arrDate[1] - 1, arrDate[2]);
  // Format it as a string (e.g., YYYY-MM-DD)
  return dateObj.toISOString().split('T')[0];
}
