import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {EmployeesStore} from "../../../../../data-access/store/employees.store";
import {EmployeePosition} from "../../../../../../../api/model/employeePosition";

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

  protected onPositionToggle(position: EmployeePosition) {
    this.store.filters.positions.togglePosition(position);
    this.store.loadAll();
  }

  protected readonly EmployeePosition = EmployeePosition;
}
