import {Component, inject, OnInit, Signal} from '@angular/core';
import {ClientsListComponent} from "../../../../clients/view/components/clients-list/clients-list.component";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {ClientStoreEntity} from "../../../../clients/data-access/model/client-store-entity";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {DEFAULT_COLUMNS_MAPPER} from "../../../../../shared/features/reports/data-access/model/columns-mapper";
import {
  ClientTableHeaderMapper
} from "../../../../clients/features/tables/data-access/model/client-table-header-mapper";
import {ClientColumns} from "../../../../clients/features/tables/data-access/model/client-columns";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AdventClientsStore} from "../../../data-access/store/advent-clients.store";
import {
  AdventClientsChipFiltersComponent
} from "../../../features/filters/view/components/advent-clients-stats-chip-filters/advent-clients-chip-filters.component";

@Component({
  selector: 'app-advent-clients-page',
  imports: [
    ClientsListComponent,
    MatButton,
    MatIcon,
    AdventClientsChipFiltersComponent,
  ],
  templateUrl: './advent-clients-page.component.html',
  styleUrl: './advent-clients-page.component.scss'
})
export class AdventClientsPageComponent implements OnInit {
  protected readonly store = inject(AdventClientsStore);
  private readonly reportsService = inject(TableReportsService);

  protected readonly $clients: Signal<ClientStoreEntity[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
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
      title: 'Звіт активних клієнтів',
      entities: this.$clients(),
      columnsMapper: DEFAULT_COLUMNS_MAPPER,
      headerMapper: ClientTableHeaderMapper,
      headerColumns: Object.values(ClientColumns)
    });
  }
}
