import {Component, computed, inject, input, output} from '@angular/core';
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
import {
  EmployeePageTableColumn,
  EmployeePageTableColumns
} from "../../../features/tables/data-access/model/employee-columns";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PaginatorModel} from "../../../../../shared/features/pagination/data-access/model/paginator-model";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../../../../core/services/auth.service";

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
    RouterLink,
    MatSort,
    MatSortHeader,
    CommonPaginatorComponent,
  ],
  templateUrl: './employees-table-list.component.html',
  styleUrl: './employees-table-list.component.scss'
})
export class EmployeesTableListComponent {
  private readonly deleteService = inject(DeleteEmployeeService);
  protected readonly authService = inject(AuthService);

  readonly $employees = input.required<Array<EmployeeStoreEntity>>({alias: 'employees'});
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});

  protected readonly page = output<PageEvent>();
  protected readonly sort = output<Sort>();

  // Separate for potential more complex dataSource
  protected readonly $dataSource = computed(() => this.$employees());

  protected readonly displayedColumns: Array<EmployeePageTableColumn> = Object.values(EmployeePageTableColumns);
  protected readonly TableColumns = EmployeePageTableColumns;

  protected onDelete(employee: EmployeeStoreEntity) {
    this.deleteService.deleteEmployee(employee);
  }
}
