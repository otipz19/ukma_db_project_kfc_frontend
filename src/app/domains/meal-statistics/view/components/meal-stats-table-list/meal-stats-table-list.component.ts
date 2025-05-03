import {Component, input, output} from '@angular/core';
import {PaginatorModel} from "../../../../../shared/features/pagination/data-access/model/paginator-model";
import {PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {MealStatistic} from "../../../../../api/model/mealStatistic";
import {
  MealStatsPageTableColumn,
  MealStatsPageTableColumns
} from "../../../features/tables/data-access/model/meal-stats-columns";
import {MealStatsTableHeaderMapper} from "../../../features/tables/data-access/model/meal-stats-table-header-mapper";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable,
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MealsStatsActualPipe} from "../../pipes/meals-stats-actual.pipe";

@Component({
  selector: 'app-meal-stats-table-list',
  imports: [
    CommonPaginatorComponent,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    RouterLink,
    MealsStatsActualPipe
  ],
  templateUrl: './meal-stats-table-list.component.html',
  styleUrl: './meal-stats-table-list.component.scss'
})
export class MealStatsTableListComponent {
  readonly $data = input.required<Array<MealStatistic>>({alias: 'data'});
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});

  protected readonly page = output<PageEvent>();
  protected readonly sort = output<Sort>();

  protected readonly displayedColumns: Array<MealStatsPageTableColumn> = Object.values(MealStatsPageTableColumns);
  protected readonly TableColumns = MealStatsPageTableColumns;
  protected readonly HeaderMapper = MealStatsTableHeaderMapper;
}
