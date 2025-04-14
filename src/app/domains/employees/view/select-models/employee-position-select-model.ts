import {EmployeePosition} from "../../../../api";
import {
  optionsToSelectOptionModelList,
  SelectOptionLabelsMap,
  SelectOptionModel
} from "../../../../shared/form/utils/select-options";

export const EmployeePositionSelectLabels: SelectOptionLabelsMap<EmployeePosition> = {
  'MANAGER': 'Менеджер',
  'TOP_MANAGER': 'Топ менеджер',
  'COOK': 'Кухар',
  'CASHIER': 'Касир'
};

export const ManagerPositionSelectOptions: SelectOptionModel<EmployeePosition>[] = [
  {value: EmployeePosition.MANAGER, label: 'Менеджер'}
];

export const MinorPositionsSelectOptions: SelectOptionModel<EmployeePosition>[] = [
  {value: EmployeePosition.CASHIER, label: 'Касир'},
  {value: EmployeePosition.COOK, label: 'Кухар'}
];
