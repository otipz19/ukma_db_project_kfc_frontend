import {Component, computed, input, output} from '@angular/core';
import {Order} from "../../../../../api/model/order";
import {OrderPageTableColumn, OrderPageTableColumns} from "../../../features/tables/data-access/model/order-columns";
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
import {
    CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PaginatorModel} from "../../../../../shared/features/pagination/data-access/model/paginator-model";
import {PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-orders-list',
  imports: [
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    RouterLink,
    CommonPaginatorComponent,
    MatSort,
    MatSortHeader
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  readonly $orders = input.required<Order[]>({alias: 'orders'});
  readonly $displayedColumns = input.required<Array<OrderPageTableColumn>>({alias: 'displayedColumns'});
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});
  protected readonly $dataSource = computed(() => this.$orders());

  protected readonly page = output<PageEvent>();
  protected readonly sort = output<Sort>();

  protected readonly TableColumns = OrderPageTableColumns;
}
