import {Pipe, PipeTransform} from "@angular/core";
import {EmployeePosition} from "../../../../api/model/employeePosition";

const EmployeePositionLabels: Record<EmployeePosition, string> = {
  [EmployeePosition.TOP_MANAGER]: 'Топ-менеджер',
  [EmployeePosition.MANAGER]: 'Менеджер',
  [EmployeePosition.COOK]: 'Кухар',
  [EmployeePosition.CASHIER]: 'Касир'
};

export function mapEmployeePositionToLabel(value: EmployeePosition): string {
  return EmployeePositionLabels[value];
}

@Pipe({
  name: 'employeePositionPipe',
  standalone: true
})
export class EmployeePositionPipe implements PipeTransform {
  transform(value: EmployeePosition | undefined): string {
    return value ? mapEmployeePositionToLabel(value) : '';
  }
}
