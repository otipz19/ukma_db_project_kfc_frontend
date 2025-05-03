import {Component, input, output} from '@angular/core';
import {PaginatorModel} from "../../../../../shared/features/pagination/data-access/model/paginator-model";
import {PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {EmployeeStatistic} from "../../../../../api/model/employeeStatistic";
import {
  EmployeeStatsPageTableColumn,
  EmployeeStatsPageTableColumns
} from "../../../features/tables/data-access/model/employee-stats-columns";
import {
  EmployeeStatsTableHeaderMapper
} from "../../../features/tables/data-access/model/employee-stats-table-header-mapper";
import {EmployeePositionPipe} from "../../../../employees/view/pipes/employee-position.pipe";

@Component({
  selector: 'app-employee-stats-table-list',
  imports: [
    CommonPaginatorComponent,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    RouterLink,
    EmployeePositionPipe,
  ],
  templateUrl: './employee-stats-table-list.component.html',
  styleUrl: './employee-stats-table-list.component.scss'
})
export class EmployeeStatsTableListComponent {
  readonly $data = input.required<Array<EmployeeStatistic>>({alias: 'data'});
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});

  protected readonly page = output<PageEvent>();
  protected readonly sort = output<Sort>();

  protected readonly displayedColumns: Array<EmployeeStatsPageTableColumn> = Object.values(EmployeeStatsPageTableColumns);
  protected readonly TableColumns = EmployeeStatsPageTableColumns;
  protected readonly HeaderMapper = EmployeeStatsTableHeaderMapper;
}
