import {Component, inject, OnInit, Signal} from '@angular/core';
import {AdminOrdersStore} from "../../../data-access/store/admin-orders.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OrdersListComponent} from "../../components/orders-list/orders-list.component";
import {ListOrderDto} from "../../../data-access/types/list-order-dto";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {OrderColumnsMapper} from "../../../features/tables/data-access/model/order-columns-mapper";
import {OrderTableHeaderMapper} from "../../../features/tables/data-access/model/order-table-header-mapper";
import {
  AdminOrderColumnsArray,
  AdminOrderDisplayedColumnsArray,
} from "../../../features/tables/data-access/model/order-columns";

@Component({
  selector: 'app-orders-page',
  imports: [
    MatButton,
    MatIcon,
    SearchBarComponent,
    OrdersListComponent,
  ],
  templateUrl: './admin-orders-page.component.html',
  styleUrl: './admin-orders-page.component.scss'
})
export class AdminOrdersPageComponent implements OnInit {
  private readonly store = inject(AdminOrdersStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new OrderColumnsMapper();
  protected readonly displayedColumns = AdminOrderDisplayedColumnsArray;

  protected readonly $orders: Signal<ListOrderDto[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onSearch(query: string) {
    this.store.filters.search.setFilter(query);
    this.store.forceSignalReload();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт замовлень',
      entities: this.$orders(),
      columnsMapper: this.columnsMapper,
      headerMapper: OrderTableHeaderMapper,
      headerColumns: AdminOrderColumnsArray
    });
  }
}
