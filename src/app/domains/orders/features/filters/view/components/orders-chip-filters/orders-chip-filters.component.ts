import {Component, inject, input} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {OrdersFiltersService} from "../../../data-access/services/orders-filters.service";
import {BaseEntityStore} from "../../../../../../../shared/store/base-entity-store";
import {ListOrderDto} from "../../../../../data-access/types/list-order-dto";
import {OrdersFilter} from "../../../../../../../api/model/ordersFilter";
import {OrdersFiltersContainer} from "../../../data-access/model/orders.filters-container";

@Component({
  selector: 'app-orders-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './orders-chip-filters.component.html',
  styleUrl: './orders-chip-filters.component.scss'
})
export class OrdersChipFiltersComponent<TStore extends BaseEntityStore<ListOrderDto, OrdersFilter, OrdersFiltersContainer>> {
  private readonly filtersService = inject(OrdersFiltersService);
  readonly $store = input.required<TStore>({alias: 'store'});

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
}
