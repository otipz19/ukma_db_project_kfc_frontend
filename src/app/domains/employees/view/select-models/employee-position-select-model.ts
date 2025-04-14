import {EmployeePosition} from "../../../../api";
import {
  SelectOptionModel
} from "../../../../shared/form/utils/select-options";

export const ManagerPositionSelectOptions: SelectOptionModel<EmployeePosition>[] = [
  {value: EmployeePosition.MANAGER, label: 'Менеджер'}
];

export const MinorPositionsSelectOptions: SelectOptionModel<EmployeePosition>[] = [
  {value: EmployeePosition.CASHIER, label: 'Касир'},
  {value: EmployeePosition.COOK, label: 'Кухар'}
];
