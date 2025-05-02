import {Component, input, output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {PaginatorModel} from "../../../../../shared/features/pagination/data-access/model/paginator-model";
import {RestaurantStatistic} from "../../../../../api/model/restaurantStatistic";
import {
  RestaurantStatsPageTableColumn,
  RestaurantStatsPageTableColumns
} from "../../../features/tables/data-access/model/restaurant-stats-columns";
import {
  RestaurantStatsTableHeaderMapper
} from "../../../features/tables/data-access/model/restaurant-stats-table-header-mapper";
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
  MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-restaurants-stats-table-list',
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
  ],
  templateUrl: './restaurants-stats-table-list.component.html',
  styleUrl: './restaurants-stats-table-list.component.scss'
})
export class RestaurantsStatsTableListComponent {
  readonly $data = input.required<Array<RestaurantStatistic>>({alias: 'data'});
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});

  protected readonly page = output<PageEvent>();
  protected readonly sort = output<Sort>();

  protected readonly displayedColumns: Array<RestaurantStatsPageTableColumn> = Object.values(RestaurantStatsPageTableColumns);
  protected readonly TableColumns = RestaurantStatsPageTableColumns;
  protected readonly HeaderMapper = RestaurantStatsTableHeaderMapper;
}
