import {ServerSideFilterModel} from "../../../../../../shared/features/filters/model/server-side-filter-model";
import {EmployeesStatisticFilter} from "../../../../../../api/model/employeesStatisticFilter";
import {EmployeePosition} from "../../../../../../api/model/employeePosition";

export class EmployeeStatsPositionFilterModel implements ServerSideFilterModel<EmployeesStatisticFilter> {
  private positionsValues = Object.values(EmployeePosition);

  private positionsMap = new Map<EmployeePosition, boolean>([
    [EmployeePosition.MANAGER, false],
    [EmployeePosition.CASHIER, true],
    [EmployeePosition.COOK, false],
  ]);

  isPositionEnabled(position: EmployeePosition) {
    return this.positionsMap.get(position);
  }

  togglePosition(position: EmployeePosition) {
    this.positionsMap.set(position, !this.positionsMap.get(position));
    for (const option of this.positionsValues) {
      if (option !== position) {
        this.positionsMap.set(option, false);
      }
    }
  }

  getFilterDtoPart(): Partial<EmployeesStatisticFilter> {
    return {position: this.getAllTrue()[0]};
  }

  hasFilter(): boolean {
    return this.getAllTrue().length > 0;
  }

  cleanFilter(): void {
    this.positionsMap.set(EmployeePosition.MANAGER, false);
    this.positionsMap.set(EmployeePosition.COOK, false);
    this.positionsMap.set(EmployeePosition.CASHIER, true);
  }

  private getAllTrue(): Array<EmployeePosition> {
    const result: EmployeePosition[] = [];
    for (const position of this.positionsValues) {
      if (this.positionsMap.get(position)) {
        result.push(position);
      }
    }
    return result;
  }
}
