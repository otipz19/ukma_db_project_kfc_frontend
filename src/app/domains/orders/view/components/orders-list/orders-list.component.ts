import {Component, computed, input} from '@angular/core';
import {Order} from "../../../../../api/model/order";
import {OrderPageTableColumn, OrderPageTableColumns} from "../../../features/tables/data-access/model/order-columns";
import {EmployeePositionPipe} from "../../../../employees/view/pipes/employee-position.pipe";
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

@Component({
  selector: 'app-orders-list',
  imports: [
    EmployeePositionPipe,
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
    RouterLink
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  readonly $orders = input.required<Order[]>({alias: 'orders'});
  protected readonly $dataSource = computed(() => this.$orders());

  protected readonly displayedColumns: Array<OrderPageTableColumn> = Object.values(OrderPageTableColumns);
  protected readonly TableColumns = OrderPageTableColumns;
}
