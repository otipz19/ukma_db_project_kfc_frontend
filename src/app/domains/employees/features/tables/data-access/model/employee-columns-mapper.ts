import {ColumnMapperFn, ColumnsMapper} from "./columns-mapper";
import {EmployeeStoreEntity} from "../../../../data-access/model/employee-store-entity";
import {mapEmployeePositionToLabel} from "../../../../view/pipes/employee-position.pipe";
import {EmployeePosition} from "../../../../../../api/model/employeePosition";

export class EmployeeColumnsMapper extends ColumnsMapper<EmployeeStoreEntity> {
  protected override readonly mappers = new Map<keyof EmployeeStoreEntity, ColumnMapperFn<EmployeeStoreEntity>>([
    ['position', (position) => mapEmployeePositionToLabel(position as EmployeePosition)]
  ]);
}
