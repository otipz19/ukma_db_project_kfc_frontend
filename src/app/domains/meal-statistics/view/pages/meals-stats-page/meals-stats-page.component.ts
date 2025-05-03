import {Component, inject, OnInit, Signal} from '@angular/core';
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {MealStatsColumnsMapper} from "../../../features/tables/data-access/model/meal-stats-columns-mapper";
import {MealStatistic} from "../../../../../api/model/mealStatistic";
import {MealStatsTableHeaderMapper} from "../../../features/tables/data-access/model/meal-stats-table-header-mapper";
import {MealStatsColumns} from "../../../features/tables/data-access/model/meal-stats-columns";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MealStatsTableListComponent} from "../../components/meal-stats-table-list/meal-stats-table-list.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MealStatsChipFiltersComponent
} from "../../../features/filters/view/components/meal-stats-chip-filters/meal-stats-chip-filters.component";
import {MealStatsStore} from "../../../data-access/store/meal-stats.store";

@Component({
  selector: 'app-meals-stats-page',
  imports: [
    MatButton,
    MatIcon,
    SearchBarComponent,
    MealStatsTableListComponent,
    MealStatsChipFiltersComponent
  ],
  templateUrl: './meals-stats-page.component.html',
  styleUrl: './meals-stats-page.component.scss'
})
export class MealsStatsPageComponent implements OnInit {
  protected readonly store = inject(MealStatsStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new MealStatsColumnsMapper();

  protected readonly $data: Signal<MealStatistic[]> = this.store.$viewList;

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
      title: 'Звіт статистики страв',
      entities: this.$data(),
      columnsMapper: this.columnsMapper,
      headerMapper: MealStatsTableHeaderMapper,
      headerColumns: Object.values(MealStatsColumns)
    });
  }
}
