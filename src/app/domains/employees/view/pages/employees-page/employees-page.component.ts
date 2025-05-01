import {Component, inject, OnInit, Signal} from '@angular/core';
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {EmployeesTableListComponent} from "../../components/employees-table-list/employees-table-list.component";
import {EmployeesStore} from "../../../data-access/store/employees.store";
import {EmployeeStoreEntity} from '../../../data-access/model/employee-store-entity';
import {RouterLink} from "@angular/router";
import {EmployeeTableHeaderMapper} from "../../../features/tables/data-access/model/employee-table-header-mapper";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {EmployeeColumnsMapper} from "../../../features/tables/data-access/model/employee-columns-mapper";
import {EmployeeColumns} from "../../../features/tables/data-access/model/employee-columns";
import {MatIcon} from "@angular/material/icon";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-employees-page',
  imports: [
    MatButton,
    SearchBarComponent,
    EmployeesTableListComponent,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss'
})
export class EmployeesPageComponent implements OnInit {
  private readonly store = inject(EmployeesStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new EmployeeColumnsMapper();

  protected readonly $employees: Signal<EmployeeStoreEntity[]> = this.store.$viewList;

  ngOnInit() {
    this.store.loadAll();
  }

  protected onSearch(query: string) {
    this.store.filters.searchFilter.setFilter(query);
    this.store.forceSignalReload();
  }

  protected onSort(sort: Sort) {
    this.store.sort(sort);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт працівників',
      entities: this.$employees(),
      columnsMapper: this.columnsMapper,
      headerMapper: EmployeeTableHeaderMapper,
      headerColumns: Object.values(EmployeeColumns)
    });
  }
}
