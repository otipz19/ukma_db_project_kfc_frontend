import {Component, computed, inject, input} from '@angular/core';
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
import {EmployeePositionPipe} from "../../pipes/employee-position.pipe";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DeleteEmployeeService} from "../../../features/delete-employee/data-access/services/delete-employee.service";
import {RouterLink} from "@angular/router";
import {UpdateEmployeeService} from "../../../features/update-employee/data-access/services/update-employee.service";
import {EmployeesStore} from "../../../data-access/store/employees.store";

type EmployeeColumn = (keyof Omit<EmployeeStoreEntity, 'id' | 'username'>) | 'actions';

const EmployeeColumns: Record<EmployeeColumn, EmployeeColumn> = {
  passportNumber: 'passportNumber',
  surname: 'surname',
  firstName: 'firstName',
  middleName: 'middleName',
  salary: 'salary',
  birthDate: 'birthDate',
  position: 'position',
  managerUserId: 'managerUserId',
  restaurantId: 'restaurantId',
  actions: 'actions'
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
    MatRowDef,
    EmployeePositionPipe,
    MatIcon,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './employees-table-list.component.html',
  styleUrl: './employees-table-list.component.scss'
})
export class EmployeesTableListComponent {
  private readonly store = inject(EmployeesStore);
  private readonly deleteService = inject(DeleteEmployeeService);
  private readonly editService = inject(UpdateEmployeeService);

  readonly $employees = input.required<Array<EmployeeStoreEntity>>({alias: 'employees'});

  // Separate for potential more complex dataSource
  protected readonly $dataSource = computed(() => this.$employees());

  protected readonly displayedColumns: Array<EmployeeColumn> = Object.values(EmployeeColumns);
  protected readonly EmployeeColumns = EmployeeColumns;

  onEdit(employee: EmployeeStoreEntity) {
    this.editService.update$(employee)
      .subscribe(() => {
        this.store.update(employee.id, employee.id);
      });
  }

  onDelete(employee: EmployeeStoreEntity) {
    this.deleteService.deleteEmployee(employee);
  }
}
