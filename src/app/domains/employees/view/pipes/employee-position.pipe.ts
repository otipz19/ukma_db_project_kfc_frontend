import {Pipe, PipeTransform} from "@angular/core";
import {EmployeePosition} from "../../../../api";

const EmployeePositionLabels: Record<EmployeePosition, string> = {
  [EmployeePosition.TOP_MANAGER]: 'Топ-менеджер',
  [EmployeePosition.MANAGER]: 'Менеджер',
  [EmployeePosition.COOK]: 'Кухар',
  [EmployeePosition.CASHIER]: 'Касир'
};

@Pipe({
  name: 'employeePositionPipe',
  standalone: true
})
export class EmployeePositionPipe implements PipeTransform {
  transform(value: EmployeePosition): string {
    return EmployeePositionLabels[value];
  }
}
