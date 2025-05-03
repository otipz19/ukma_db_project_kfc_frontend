import {Component, inject} from '@angular/core';
import {MatChipListbox, MatChipOption, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {AdventClientsStore} from "../../../../../data-access/store/advent-clients.store";
import {AdventClientsFiltersService} from "../../../data-access/services/advent-clients-filters.service";

@Component({
  selector: 'app-advent-clients-chip-filters',
    imports: [
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatIcon
    ],
  templateUrl: './advent-clients-chip-filters.component.html',
  styleUrl: './advent-clients-chip-filters.component.scss'
})
export class AdventClientsChipFiltersComponent {
  private readonly store = inject(AdventClientsStore);
  private readonly filtersService = inject(AdventClientsFiltersService);

  protected onPriceOpen() {
    this.filtersService.openPrice();
  }

  protected onPriceToggle() {
    this.store.filters.price.toggleFilter();
    this.store.loadAll();
  }
}
