import {Component, inject, OnInit, Signal} from '@angular/core';
import {EmployeeOrdersStore} from "../../../data-access/store/employee-orders.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OrdersListComponent} from "../../components/orders-list/orders-list.component";
import {ListOrderDto} from "../../../data-access/types/list-order-dto";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {OrderColumnsMapper} from "../../../features/tables/data-access/model/order-columns-mapper";
import {OrderTableHeaderMapper} from "../../../features/tables/data-access/model/order-table-header-mapper";
import {
  EmployeeOrderColumnsArray,
  EmployeeOrderDisplayedColumnsArray,
} from "../../../features/tables/data-access/model/order-columns";
import {getFromResolver} from "../../../../../shared/resolvers/get-from-resolver";
import {RESTAURANT_RESOLVER_KEY} from "../../../../restaurants/data-access/resolvers/restaurant.resolver";
import {Restaurant} from "../../../../../api/model/restaurant";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-orders-page',
  imports: [
    MatButton,
    MatIcon,
    SearchBarComponent,
    OrdersListComponent,
  ],
  templateUrl: './employee-orders-page.component.html',
  styleUrl: './employee-orders-page.component.scss'
})
export class EmployeeOrdersPageComponent implements OnInit {
  protected readonly store = inject(EmployeeOrdersStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new OrderColumnsMapper();
  protected readonly displayedColumns = EmployeeOrderDisplayedColumnsArray;

  protected readonly $orders: Signal<ListOrderDto[]> = this.store.$viewList;

  private readonly restaurant = getFromResolver<Restaurant | undefined>(RESTAURANT_RESOLVER_KEY);

  ngOnInit() {
    if(this.restaurant) {
      this.store.setRestaurantId(this.restaurant.id);
    }
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
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
      headerColumns: EmployeeOrderColumnsArray
    });
  }
}
