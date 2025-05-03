import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {of} from "rxjs";
import {BaseEntityStore} from "../../../../../../shared/store/base-entity-store";
import {OrdersFilter} from "../../../../../../api/model/ordersFilter";
import {OrdersFiltersContainer} from "../model/orders.filters-container";
import {
  OrdersCostRangeFilterFormComponent
} from "../../view/components/orders-cost-range-filter-form/orders-cost-range-filter-form.component";
import {
  OrdersDateCreatedRangeFilterFormComponent
} from "../../view/components/orders-date-created-range-filter-form/orders-date-created-range-filter-form.component";
import {Order} from "../../../../../../api/model/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);

  openCostRange<TStore extends BaseEntityStore<Order, OrdersFilter, OrdersFiltersContainer>>(store: TStore) {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон вартості',
        formComponent: OrdersCostRangeFilterFormComponent,
        initialValue: store.filters.cost.getRange(),
        submitCallback: (range) => {
          store.filters.cost.setRange(range);
          store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openDateCreatedRange<TStore extends BaseEntityStore<Order, OrdersFilter, OrdersFiltersContainer>>(store: TStore) {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон дати створення',
        formComponent: OrdersDateCreatedRangeFilterFormComponent,
        initialValue: store.filters.dateCreated.getRange(),
        submitCallback: (range) => {
          store.filters.dateCreated.setRange(range);
          store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }
}
