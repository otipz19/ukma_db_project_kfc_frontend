import {Component, inject, OnInit, Signal} from '@angular/core';
import {ClientsStore} from "../../../data-access/store/clients.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {ClientsListComponent} from "../../components/clients-list/clients-list.component";
import {ClientStoreEntity} from "../../../data-access/model/client-store-entity";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {ClientColumns} from "../../../features/tables/data-access/model/client-columns";
import {DEFAULT_COLUMNS_MAPPER} from "../../../../../shared/features/reports/data-access/model/columns-mapper";
import {ClientTableHeaderMapper} from "../../../features/tables/data-access/model/client-table-header-mapper";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-clients-page',
  imports: [
    SearchBarComponent,
    ClientsListComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss'
})
export class ClientsPageComponent implements OnInit {
  protected readonly store = inject(ClientsStore);
  private readonly reportsService = inject(TableReportsService);

  protected readonly $clients: Signal<ClientStoreEntity[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onSearch(query: string) {
    this.store.filters.search.setQuery(query);
    this.store.loadAll();
  }

  protected onSort(sort: Sort) {
    this.store.sort(sort);
    this.store.loadAll();
  }

  protected onPagination(event: PageEvent) {
    this.store.paginatorModel.pageSize = event.pageSize;
    this.store.paginatorModel.pageIndex = event.pageIndex;
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт клієнтів',
      entities: this.$clients(),
      columnsMapper: DEFAULT_COLUMNS_MAPPER,
      headerMapper: ClientTableHeaderMapper,
      headerColumns: Object.values(ClientColumns)
    });
  }
}
