import {Component, inject, OnInit, Signal} from '@angular/core';
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {EmployeeStatsStore} from "../../../data-access/store/employee-stats.store";
import {EmployeeStatsColumnsMapper} from "../../../features/tables/data-access/model/employee-stats-columns-mapper";
import {EmployeeStatistic} from "../../../../../api/model/employeeStatistic";
import {
  EmployeeStatsTableHeaderMapper
} from "../../../features/tables/data-access/model/employee-stats-table-header-mapper";
import {EmployeeStatsColumns} from "../../../features/tables/data-access/model/employee-stats-columns";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {
  EmployeeStatsTableListComponent
} from "../../components/employee-stats-table-list/employee-stats-table-list.component";
import {
  EmployeeStatsChipFiltersComponent
} from "../../../features/filters/view/components/employee-stats-chip-filters/employee-stats-chip-filters.component";

@Component({
  selector: 'app-employee-stats-page',
  imports: [
    SearchBarComponent,
    MatButton,
    MatIcon,
    EmployeeStatsTableListComponent,
    EmployeeStatsChipFiltersComponent
  ],
  templateUrl: './employee-stats-page.component.html',
  styleUrl: './employee-stats-page.component.scss'
})
export class EmployeeStatsPageComponent implements OnInit {
  protected readonly store = inject(EmployeeStatsStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new EmployeeStatsColumnsMapper();

  protected readonly $data: Signal<EmployeeStatistic[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onSearch(query: string) {
    this.store.filters.search.setQuery(query);
    this.store.loadAll();
  }

  protected onSort(sort: Sort) {
    this.store.sort(sort);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт статистики працівників',
      entities: this.$data(),
      columnsMapper: this.columnsMapper,
      headerMapper: EmployeeStatsTableHeaderMapper,
      headerColumns: Object.values(EmployeeStatsColumns)
    });
  }
}
