import {
  ColumnMapperFn,
  ColumnsMapper
} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {EmployeeStatistic} from "../../../../../../api/model/employeeStatistic";
import {mapEmployeePositionToLabel} from "../../../../../employees/view/pipes/employee-position.pipe";
import {EmployeePosition} from "../../../../../../api/model/employeePosition";

export class EmployeeStatsColumnsMapper extends ColumnsMapper<EmployeeStatistic> {
  protected override readonly mappers = new Map<keyof EmployeeStatistic, ColumnMapperFn<EmployeeStatistic>>([
    ['position', (position) => mapEmployeePositionToLabel(position as EmployeePosition)]
  ]);
}
