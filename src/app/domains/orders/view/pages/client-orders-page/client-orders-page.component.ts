import {Component, inject, OnInit, Signal} from '@angular/core';
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {OrderColumnsMapper} from "../../../features/tables/data-access/model/order-columns-mapper";
import {ListOrderDto} from "../../../data-access/types/list-order-dto";
import {OrderTableHeaderMapper} from "../../../features/tables/data-access/model/order-table-header-mapper";
import {
    ClientOrderColumnsArray, ClientOrderDisplayedColumnsArray,
} from "../../../features/tables/data-access/model/order-columns";
import {ClientOrdersStore} from "../../../data-access/store/client-orders.store";
import {OrdersListComponent} from "../../components/orders-list/orders-list.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {getFromResolver} from "../../../../../shared/resolvers/get-from-resolver";
import {ClientStoreEntity} from "../../../../clients/data-access/model/client-store-entity";
import {CLIENT_RESOLVER_KEY} from "../../../../clients/data-access/resolvers/client.resolver";
import {PageEvent} from "@angular/material/paginator";
import {
  OrdersChipFiltersComponent
} from "../../../features/filters/view/components/orders-chip-filters/orders-chip-filters.component";

@Component({
  selector: 'app-client-orders-page',
  imports: [
    MatButton,
    MatIcon,
    OrdersListComponent,
    OrdersChipFiltersComponent,
  ],
  templateUrl: './client-orders-page.component.html',
  styleUrl: './client-orders-page.component.scss'
})
export class ClientOrdersPageComponent implements OnInit {
  protected readonly store = inject(ClientOrdersStore);
  private readonly reportsService = inject(TableReportsService);

  private readonly columnsMapper = new OrderColumnsMapper();
  protected readonly displayedColumns = ClientOrderDisplayedColumnsArray;

  protected readonly client = getFromResolver<ClientStoreEntity>(CLIENT_RESOLVER_KEY);

  protected readonly $orders: Signal<ListOrderDto[]> = this.store.$viewList;

  ngOnInit() {
    this.store.setClientId(this.client.id);
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт замовлень',
      entities: this.$orders(),
      columnsMapper: this.columnsMapper,
      headerMapper: OrderTableHeaderMapper,
      headerColumns: ClientOrderColumnsArray
    });
  }
}
