import {Component, inject, OnInit, Signal} from '@angular/core';
import {IngredientsListComponent} from "../../components/ingredients-list/ingredients-list.component";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {CreateIngredientService} from "../../../features/create-ingredient/services/create-ingredient.service";
import {Ingredient} from "../../../../../api/model/ingredient";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";
import {TableReportsService} from "../../../../../shared/features/reports/data-access/services/table-reports.service";
import {IngredientsColumnsMapper} from "../../../features/tables/data-access/model/ingredients-columns-mapper";
import {IngredientsColumns} from "../../../features/tables/data-access/model/ingredients-columns";
import {IngredientTableHeaderMapper} from "../../../features/tables/data-access/model/ingredient-table-header-mapper";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-ingredients-page',
  imports: [
    IngredientsListComponent,
    SearchBarComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss',
})
export class IngredientsPageComponent implements OnInit {
  private readonly store = inject(IngredientsStore);
  private readonly createService = inject(CreateIngredientService);
  private readonly authService = inject(AuthService);
  private readonly reportsService = inject(TableReportsService);
  private readonly columnsMapper = new IngredientsColumnsMapper();

  protected readonly $ingredients: Signal<Ingredient[]> = this.store.$viewList;

  protected readonly $userRole = this.authService.$role;

  ngOnInit(): void {
    this.store.loadAll();
    this.store.cleanFilters();
  }

  protected onCreateClick() {
    this.createService.create();
  }

  protected onSearch(query: string) {
    this.store.filters.titleFilter.setFilter(query);
    this.store.forceSignalReload();
  }

  protected onExportReport() {
    this.reportsService.exportReport({
      title: 'Звіт інгредієнтів',
      entities: this.$ingredients(),
      columnsMapper: this.columnsMapper,
      headerMapper: IngredientTableHeaderMapper,
      headerColumns: Object.values(IngredientsColumns)
    });
  }

  protected readonly UserRole = UserRole;
}
