import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {EmployeesStore} from "../../../../data-access/store/employees.store";
import {
  EmployeeSalaryRangeFilterFormComponent
} from "../../view/components/employee-salary-range-filter-form/employee-salary-range-filter-form.component";
import {of} from "rxjs";
import {
  EmployeeBirthDateRangeFilterFormComponent
} from "../../view/components/meals-energetic-value-range-filter-form/employee-birth-date-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class EmployeeFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly store = inject(EmployeesStore);

  openSalaryRange() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть заробітної плати',
        formComponent: EmployeeSalaryRangeFilterFormComponent,
        initialValue: this.store.filters.salary.getRange(),
        submitCallback: (range) => {
          this.store.filters.salary.setRange(range);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }

  openBirthDateRange() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон дати народження',
        formComponent: EmployeeBirthDateRangeFilterFormComponent,
        initialValue: this.store.filters.birthDate.getRange(),
        submitCallback: (range) => {
          this.store.filters.birthDate.setRange(range);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }
}
