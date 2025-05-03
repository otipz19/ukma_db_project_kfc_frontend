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
import {PageEvent} from "@angular/material/paginator";
import {
  EmployeeChipFiltersComponent
} from "../../../features/filters/view/components/employee-chip-filters/employee-chip-filters.component";
import {getFromResolver} from "../../../../../shared/resolvers/get-from-resolver";
import {RESTAURANT_RESOLVER_KEY} from "../../../../restaurants/data-access/resolvers/restaurant.resolver";
import {Restaurant} from "../../../../../api/model/restaurant";

@Component({
  selector: 'app-employees-page',
  imports: [
    MatButton,
    SearchBarComponent,
    EmployeesTableListComponent,
    RouterLink,
    MatIcon,
    EmployeeChipFiltersComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss'
})
export class EmployeesPageComponent implements OnInit {
  protected readonly store = inject(EmployeesStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new EmployeeColumnsMapper();

  protected readonly $employees: Signal<EmployeeStoreEntity[]> = this.store.$viewList;

  private readonly restaurant = getFromResolver<Restaurant | undefined>(RESTAURANT_RESOLVER_KEY);

  ngOnInit() {
    this.store.setRestaurantId(this.restaurant?.id);
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onSearch(query: string) {
    this.store.filters.searchFilter.setQuery(query);
    this.store.loadAll();
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
