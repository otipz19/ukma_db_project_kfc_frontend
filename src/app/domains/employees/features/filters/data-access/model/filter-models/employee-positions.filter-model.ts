import {EmployeesFilter} from "../../../../../../../api/model/employeesFilter";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";
import {ServerSideFilterModel} from "../../../../../../../shared/features/filters/model/server-side-filter-model";

export class EmployeePositionsFilterModel implements ServerSideFilterModel<EmployeesFilter> {
  private positionsValues = Object.values(EmployeePosition);

  private positionsMap = new Map<EmployeePosition, boolean>([
    [EmployeePosition.MANAGER, true],
    [EmployeePosition.CASHIER, true],
    [EmployeePosition.COOK, true],
  ]);

  togglePosition(position: EmployeePosition) {
    this.positionsMap.set(position, !this.positionsMap.get(position));
  }

  getFilterDtoPart(): Partial<EmployeesFilter> {
    return {positions: [...this.getAllTrue()]};
  }

  hasFilter(): boolean {
    return this.getAllTrue().length > 0;
  }

  cleanFilter(): void {
    for(const position of this.positionsValues) {
      this.positionsMap.set(position, true);
    }
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
