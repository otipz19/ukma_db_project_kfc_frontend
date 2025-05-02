import {Component, inject, OnInit, Signal} from '@angular/core';
import {RestaurantsStore} from "../../../data-access/store/restaurants.store";
import {CreateRestaurantService} from "../../../features/create/create-restaurant.service";
import {RestaurantsListComponent} from "../../components/restaurants-list/restaurants-list.component";
import {MatButton} from "@angular/material/button";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {RestaurantColumns} from "../../../features/tables/data-access/model/restaurant-columns";
import {DEFAULT_COLUMNS_MAPPER} from "../../../../../shared/features/reports/data-access/model/columns-mapper";
import {RestaurantTableHeaderMapper} from "../../../features/tables/data-access/model/restaurant-table-header-mapper";
import {MatIcon} from "@angular/material/icon";
import {Restaurant} from "../../../../../api/model/restaurant";
import {
    CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
    imports: [
        RestaurantsListComponent,
        MatButton,
        SearchBarComponent,
        MatIcon,
        CommonPaginatorComponent
    ],
  selector: 'app-restaurants-page',
  styleUrl: './restaurants-page.component.scss',
  templateUrl: './restaurants-page.component.html'
})
export class RestaurantsPageComponent implements OnInit {
  protected readonly store = inject(RestaurantsStore);
  private readonly createService = inject(CreateRestaurantService);
  private readonly reportsService = inject(TableReportsService);

  protected readonly $restaurants: Signal<Restaurant[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onCreate() {
    this.createService.create();
  }

  protected onSearch(query: string) {
    this.store.filters.query.setQuery(query);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт ресторанів',
      entities: this.$restaurants(),
      columnsMapper: DEFAULT_COLUMNS_MAPPER,
      headerMapper: RestaurantTableHeaderMapper,
      headerColumns: Object.values(RestaurantColumns)
    });
  }
}
