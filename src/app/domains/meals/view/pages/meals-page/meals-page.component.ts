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

@Component({
  selector: 'app-meals-page',
  imports: [
    MatButton,
    SearchBarComponent,
    MealsListComponent,
    MatIcon
  ],
  templateUrl: './meals-page.component.html',
  styleUrl: './meals-page.component.scss'
})
export class MealsPageComponent implements OnInit {
  private readonly store = inject(MealsStore);
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

  protected onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  protected onSearch(query: string) {
    this.store.filters.search.setFilter(query);
    this.store.forceSignalReload();
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
