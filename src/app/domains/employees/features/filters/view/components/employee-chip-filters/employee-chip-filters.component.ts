import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {EmployeesStore} from "../../../../../data-access/store/employees.store";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";
import {EmployeeFiltersService} from "../../../data-access/services/employee-filters.service";

@Component({
  selector: 'app-employee-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './employee-chip-filters.component.html',
  styleUrl: './employee-chip-filters.component.scss'
})
export class EmployeeChipFiltersComponent {
  private readonly store = inject(EmployeesStore);
  private readonly filtersService = inject(EmployeeFiltersService);

  protected onPositionToggle(position: EmployeePosition) {
    this.store.filters.positions.togglePosition(position);
    this.store.loadAll();
  }

  protected onSalaryOpen() {
    this.filtersService.openSalaryRange();
  }

  protected onSalaryToggle() {
    this.store.filters.salary.toggleFilter();
    this.store.loadAll();
  }

  protected onBirthDateOpen() {
    this.filtersService.openBirthDateRange();
  }

  protected onBirthDateToggle() {
    this.store.filters.birthDate.toggleFilter();
    this.store.loadAll();
  }

  protected readonly EmployeePosition = EmployeePosition;
}
