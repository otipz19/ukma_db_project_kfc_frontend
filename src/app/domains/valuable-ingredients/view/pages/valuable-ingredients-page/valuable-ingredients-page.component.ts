import {Component, inject, OnInit, Signal} from '@angular/core';
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {ValuableIngredientsStore} from "../../../data-access/store/valuable-ingredients.store";
import {
  IngredientsColumnsMapper
} from "../../../../ingredients/features/tables/data-access/model/ingredients-columns-mapper";
import {Ingredient} from "../../../../../api/model/ingredient";
import {
  IngredientTableHeaderMapper
} from "../../../../ingredients/features/tables/data-access/model/ingredient-table-header-mapper";
import {IngredientsColumns} from "../../../../ingredients/features/tables/data-access/model/ingredients-columns";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  IngredientsListComponent
} from "../../../../ingredients/view/components/ingredients-list/ingredients-list.component";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {
  ValuableIngredientsChipFiltersComponent
} from "../../../features/filters/view/components/valuable-ingredients-chip-filters/valuable-ingredients-chip-filters.component";

@Component({
  selector: 'app-valuable-ingredients-page',
  imports: [
    MatButton,
    MatIcon,
    IngredientsListComponent,
    CommonPaginatorComponent,
    ValuableIngredientsChipFiltersComponent
  ],
  templateUrl: './valuable-ingredients-page.component.html',
  styleUrl: './valuable-ingredients-page.component.scss'
})
export class ValuableIngredientsPageComponent implements OnInit {
  protected readonly store = inject(ValuableIngredientsStore);
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
      title: 'Звіт статистики цінних інгредієнтів',
      entities: this.$data(),
      columnsMapper: this.columnsMapper,
      headerMapper: IngredientTableHeaderMapper,
      headerColumns: Object.values(IngredientsColumns)
    });
  }
}
