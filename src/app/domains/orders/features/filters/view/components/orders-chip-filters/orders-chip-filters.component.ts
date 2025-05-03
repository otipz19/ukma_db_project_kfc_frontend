import {Component, inject, input} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {OrdersFiltersService} from "../../../data-access/services/orders-filters.service";
import {BaseEntityStore} from "../../../../../../../shared/store/base-entity-store";
import {OrdersFilter} from "../../../../../../../api/model/ordersFilter";
import {OrdersFiltersContainer} from "../../../data-access/model/orders.filters-container";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";
import {OrderStatus} from "../../../data-access/model/order-status.filter-model";
import {Order} from "../../../../../../../api/model/order";
import {AuthService} from "../../../../../../../core/services/auth.service";
import {UserRole} from "../../../../../../../api";

@Component({
  selector: 'app-orders-chip-filters',
  imports: [
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatIcon,
  ],
  templateUrl: './orders-chip-filters.component.html',
  styleUrl: './orders-chip-filters.component.scss'
})
export class OrdersChipFiltersComponent<TStore extends BaseEntityStore<Order, OrdersFilter, OrdersFiltersContainer>> {
  protected authService = inject(AuthService);

  private readonly filtersService = inject(OrdersFiltersService);
  readonly $store = input.required<TStore>({alias: 'store'});

  protected onOldOrders() {
    this.$store().filters.oldOrders.toggleFilter();
    this.$store().loadAll();
  }

  protected onStatusToggle(status: OrderStatus) {
    this.$store().filters.status.toggleStatus(status);
    this.$store().loadAll();
  }

  protected onCostOpen() {
    this.filtersService.openCostRange(this.$store());
  }

  protected onCostToggle() {
    this.$store().filters.cost.toggleFilter();
    this.$store().loadAll();
  }

  protected onDateCreatedOpen() {
    this.filtersService.openDateCreatedRange(this.$store());
  }

  protected onDateToggle() {
    this.$store().filters.dateCreated.toggleFilter();
    this.$store().loadAll();
  }

  protected readonly EmployeePosition = EmployeePosition;
  protected readonly OrderStatus = OrderStatus;
  protected readonly UserRole = UserRole;
}
