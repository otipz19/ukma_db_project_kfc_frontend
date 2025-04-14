import {Component, inject, OnInit, Signal} from '@angular/core';
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {MatButton} from "@angular/material/button";
import {EmployeesTableListComponent} from "../../components/employees-table-list/employees-table-list.component";
import {EmployeesStore} from "../../../data-access/store/employees.store";
import { EmployeeStoreEntity } from '../../../data-access/model/employee-store-entity';
import {CreateEmployeeService} from "../../../features/create-employee/data-access/services/create-employee.service";

@Component({
  selector: 'app-employees-page',
  imports: [
    MatButton,
    SearchBarComponent,
    EmployeesTableListComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss'
})
export class EmployeesPageComponent implements OnInit {
  private readonly store = inject(EmployeesStore);
  private readonly createService = inject(CreateEmployeeService);

  protected readonly $employees: Signal<EmployeeStoreEntity[]> = this.store.$viewList;

  ngOnInit() {
    this.store.loadAll();
  }

  protected onCreate() {
    this.createService.create();
  }

  protected onSearch(query: string) {
    this.store.filters.searchFilter.setFilter(query);
    this.store.forceSignalReload();
  }
}
