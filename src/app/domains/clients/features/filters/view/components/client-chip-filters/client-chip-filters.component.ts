import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {ClientsStore} from "../../../../../data-access/store/clients.store";
import {ClientFiltersService} from "../../../data-access/services/client-filters.service";

@Component({
  selector: 'app-client-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './client-chip-filters.component.html',
  styleUrl: './client-chip-filters.component.scss'
})
export class ClientChipFiltersComponent {
  private readonly store = inject(ClientsStore);
  private readonly filtersService = inject(ClientFiltersService);

  protected onBonusesOpen() {
    this.filtersService.openBonusesRange();
  }

  protected onBonusesToggle() {
    this.store.filters.bonuses.toggleFilter();
    this.store.loadAll();
  }

  protected onBirthDateOpen() {
    this.filtersService.openBirthDateRange();
  }

  protected onBirthDateToggle() {
    this.store.filters.birthDate.toggleFilter();
    this.store.loadAll();
  }
}
