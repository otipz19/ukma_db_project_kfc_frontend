import {Component, computed, input} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {EmployeeStoreEntity} from "../../../data-access/model/employee-store-entity";

type EmployeeColumn = keyof Omit<EmployeeStoreEntity, 'id'>;

const EmployeeColumns: Record<EmployeeColumn, EmployeeColumn> = {
  passportNumber: 'passportNumber',
  surname: 'surname',
  firstName: 'firstName',
  middleName: 'middleName',
  salary: 'salary',
  birthDate: 'birthDate',
  username: 'username',
  position: 'position',
  managerUserId: 'managerUserId',
  restaurantId: 'restaurantId',
};

@Component({
  selector: 'app-employees-table-list',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './employees-table-list.component.html',
  styleUrl: './employees-table-list.component.scss'
})
export class EmployeesTableListComponent {
  readonly $employees = input.required<Array<EmployeeStoreEntity>>({alias: 'employees'});

  // Separate for potential more complex dataSource
  protected readonly $dataSource = computed(() => this.$employees());

  protected readonly displayedColumns: Array<EmployeeColumn> = Object.values(EmployeeColumns);
  protected readonly EmployeeColumns = EmployeeColumns;
}
