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
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DeleteEmployeeService} from "../../../features/delete-employee/data-access/services/delete-employee.service";
import {RouterLink} from "@angular/router";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import {
  EmployeePageTableColumn,
  EmployeePageTableColumns
} from "../../../features/tables/data-access/model/employee-columns";
import {EmployeeColumnsMapper} from "../../../features/tables/data-access/model/employee-columns-mapper";
import {mapEntityToRow} from "../../../features/tables/data-access/model/map-entity-to-row";
import {EmployeeTableHeaderMapper} from "../../../features/tables/data-access/model/employee-table-header-mapper";

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
    MatButton
  ],
  templateUrl: './employees-table-list.component.html',
  styleUrl: './employees-table-list.component.scss'
})
export class EmployeesTableListComponent {
  private readonly deleteService = inject(DeleteEmployeeService);
  private readonly columnsMapper = new EmployeeColumnsMapper();

  readonly $employees = input.required<Array<EmployeeStoreEntity>>({alias: 'employees'});

  // Separate for potential more complex dataSource
  protected readonly $dataSource = computed(() => this.$employees());

  protected readonly displayedColumns: Array<EmployeePageTableColumn> = Object.values(EmployeePageTableColumns);
  protected readonly TableColumns = EmployeePageTableColumns;

  protected onDelete(employee: EmployeeStoreEntity) {
    this.deleteService.deleteEmployee(employee);
  }

  protected onExportReport() {
    const doc = new jsPDF();
    doc.setFont('Roboto-Regular', 'normal');
    doc.text('Звіт працівників', 105, 15, {align: 'center'});
    doc.line(10, 20, 200, 20);
    const header = this.displayedColumns.filter(c => c !== 'actions');
    const data = this.$employees().map(e => mapEntityToRow(e, header, this.columnsMapper));
    autoTable(doc, {
      startY: 25,
      head: [header.map(h => EmployeeTableHeaderMapper[h])],
      //@ts-ignore
      body: data,
      theme: 'grid',
      headStyles: {
        valign: 'bottom',
        halign: 'center'
      },
      styles: {
        overflow: 'linebreak',
        font: 'Roboto-Regular',
        fontStyle: 'normal',
      }
    });
    doc.save();
  }
}
