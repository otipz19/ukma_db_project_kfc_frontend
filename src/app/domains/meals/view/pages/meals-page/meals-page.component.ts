import {Component, inject, OnInit, Signal} from '@angular/core';
import {MealsStore} from "../../../data-access/store/meals.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {MealsListComponent} from "../../components/meals-list/meals-list.component";
import {Meal} from "../../../../../api/model/meal";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {MealColumnsMapper} from "../../../features/tables/data-access/model/meal-columns-mapper";
import {MatIcon} from "@angular/material/icon";
import {MealColumns} from "../../../features/tables/data-access/model/meal-columns";
import {MealTableHeaderMapper} from "../../../features/tables/data-access/model/meal-table-header-mapper";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";
import {PageEvent} from "@angular/material/paginator";
import {MealsFiltersComponent} from "../../components/meals-filters/meals-filters.component";

@Component({
  selector: 'app-meals-page',
  imports: [
    MatButton,
    SearchBarComponent,
    MealsListComponent,
    MatIcon,
    CommonPaginatorComponent,
    MealsFiltersComponent
  ],
  templateUrl: './meals-page.component.html',
  styleUrl: './meals-page.component.scss'
})
export class MealsPageComponent implements OnInit {
  protected readonly store = inject(MealsStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly authService = inject(AuthService);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new MealColumnsMapper();

  protected readonly $meals: Signal<Meal[]> = this.store.$viewList;

  protected readonly $userRole = this.authService.$role;

  ngOnInit() {
    this.store.loadAll();
  }

  protected onPagination(page: PageEvent) {
    this.store.paginatorModel.setPageEvent(page);
    this.store.loadAll();
  }

  protected onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  protected onSearch(query: string) {
    this.store.filters.search.setQuery(query);
    this.store.loadAll();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт страв',
      entities: this.$meals(),
      columnsMapper: this.columnsMapper,
      headerMapper: MealTableHeaderMapper,
      headerColumns: Object.values(MealColumns)
    });
  }

  protected readonly UserRole = UserRole;
}
