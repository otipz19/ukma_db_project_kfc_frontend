import {EmployeePosition} from "../../../../api";
import {optionsToSelectOptionModelList, SelectOptionLabelsMap} from "../../../../shared/form/utils/select-options";

export const EmployeePositionSelectLabels: SelectOptionLabelsMap<EmployeePosition> = {
  'MANAGER': 'Менеджер',
  'TOP_MANAGER': 'Топ менеджер',
  'COOK': 'Кухар',
  'CASHIER': 'Касир'
};

export const employeePositionSelectOptionModelList = optionsToSelectOptionModelList(EmployeePosition, EmployeePositionSelectLabels);
