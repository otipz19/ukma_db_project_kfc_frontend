import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {ClientsStore} from "../../../../data-access/store/clients.store";
import {
  ClientBonusesRangeFilterFormComponent
} from "../../view/components/client-bonuses-range-filter-form/client-bonuses-range-filter-form.component";
import {of} from "rxjs";
import {
  ClientBirthDateRangeFilterFormComponent
} from "../../view/components/client-birth-date-range-filter-form/client-birth-date-range-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class ClientFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly store = inject(ClientsStore);

  openBonusesRange() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть діапазон кількості бонусів',
        formComponent: ClientBonusesRangeFilterFormComponent,
        initialValue: this.store.filters.bonuses.getRange(),
        submitCallback: (range) => {
          this.store.filters.bonuses.setRange(range);
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
        formComponent: ClientBirthDateRangeFilterFormComponent,
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
