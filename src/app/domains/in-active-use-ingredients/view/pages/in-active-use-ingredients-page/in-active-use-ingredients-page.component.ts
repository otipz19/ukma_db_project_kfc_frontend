import {Component, inject, OnInit, Signal} from '@angular/core';
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {
  IngredientsColumnsMapper
} from "../../../../ingredients/features/tables/data-access/model/ingredients-columns-mapper";
import {Ingredient} from "../../../../../api/model/ingredient";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {
  IngredientTableHeaderMapper
} from "../../../../ingredients/features/tables/data-access/model/ingredient-table-header-mapper";
import {IngredientsColumns} from "../../../../ingredients/features/tables/data-access/model/ingredients-columns";
import {InActiveUseIngredientsStore} from "../../../data-access/store/in-active-use-ingredients.store";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {
  IngredientsListComponent
} from "../../../../ingredients/view/components/ingredients-list/ingredients-list.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  InActiveUseIngredientsChipFiltersComponent
} from "../../../features/filters/view/components/in-active-use-ingredients-chip-filters/in-active-use-ingredients-chip-filters.component";

@Component({
  selector: 'app-in-active-use-ingredients-page',
  imports: [
    CommonPaginatorComponent,
    IngredientsListComponent,
    MatButton,
    MatIcon,
    InActiveUseIngredientsChipFiltersComponent
  ],
  templateUrl: './in-active-use-ingredients-page.component.html',
  styleUrl: './in-active-use-ingredients-page.component.scss'
})
export class InActiveUseIngredientsPageComponent implements OnInit {
  protected readonly store = inject(InActiveUseIngredientsStore);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new IngredientsColumnsMapper();

  protected readonly $data: Signal<Ingredient[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onSort(sort: Sort) {
    this.store.sort(sort);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт статистики інгредієнтів, що активно використовуються',
      entities: this.$data(),
      columnsMapper: this.columnsMapper,
      headerMapper: IngredientTableHeaderMapper,
      headerColumns: Object.values(IngredientsColumns)
    });
  }
}
