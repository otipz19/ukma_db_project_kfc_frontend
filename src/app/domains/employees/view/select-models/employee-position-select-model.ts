import {
  SelectOptionModel
} from "../../../../shared/form/utils/select-options";
import {EmployeePosition} from "../../../../api/model/employeePosition";

export const ManagerPositionSelectOptions: SelectOptionModel<EmployeePosition>[] = [
  {value: EmployeePosition.MANAGER, label: 'Менеджер'}
];

export const MinorPositionsSelectOptions: SelectOptionModel<EmployeePosition>[] = [
  {value: EmployeePosition.CASHIER, label: 'Касир'},
  {value: EmployeePosition.COOK, label: 'Кухар'}
];
