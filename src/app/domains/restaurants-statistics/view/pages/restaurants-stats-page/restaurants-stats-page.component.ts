import {Component, inject, OnInit, Signal} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {RestaurantsStatsStore} from "../../../data-access/store/restaurants-stats.store";
import {RestaurantStatistic} from "../../../../../api/model/restaurantStatistic";
import {RestaurantStatsColumnsMapper} from "../../../features/tables/data-access/model/restaurant-stats-columns-mapper";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RestaurantStatsColumns} from "../../../features/tables/data-access/model/restaurant-stats-columns";
import {
  RestaurantStatsTableHeaderMapper
} from "../../../features/tables/data-access/model/restaurant-stats-table-header-mapper";
import {
  RestaurantsStatsTableListComponent
} from "../../components/restaurants-stats-table-list/restaurants-stats-table-list.component";
import {
  RestaurantsStatsChipFiltersComponent
} from "../../../features/filters/view/components/restaurants-stats-chip-filters/restaurants-stats-chip-filters.component";

@Component({
  selector: 'app-restaurants-stats-page',
  imports: [
    MatButton,
    MatIcon,
    SearchBarComponent,
    RestaurantsStatsTableListComponent,
    RestaurantsStatsChipFiltersComponent,
  ],
  templateUrl: './restaurants-stats-page.component.html',
  styleUrl: './restaurants-stats-page.component.scss'
})
export class RestaurantsStatsPageComponent implements OnInit {
  protected readonly store = inject(RestaurantsStatsStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new RestaurantStatsColumnsMapper();

  protected readonly $data: Signal<RestaurantStatistic[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onSearch(query: string) {
    this.store.filters.search.setQuery(query);
    this.store.loadAll();
  }

  protected onSort(sort: Sort) {
    this.store.sort(sort);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт статистики ресторанів',
      entities: this.$data(),
      columnsMapper: this.columnsMapper,
      headerMapper: RestaurantStatsTableHeaderMapper,
      headerColumns: Object.values(RestaurantStatsColumns)
    });
  }
}
