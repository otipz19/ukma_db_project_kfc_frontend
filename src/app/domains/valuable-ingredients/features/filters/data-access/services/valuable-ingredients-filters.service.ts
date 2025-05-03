import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {of} from "rxjs";
import {ValuableIngredientsStore} from "../../../../data-access/store/valuable-ingredients.store";
import {
  ValuableIngredientMinMealPriceFilterFormComponent
} from "../../view/components/valuable-ingredients-min-meal-price-filter/valuable-ingredient-min-meal-price-filter-form.component";

@Injectable({
  providedIn: 'root'
})
export class ValuableIngredientsFiltersService {
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly store = inject(ValuableIngredientsStore);

  openMinMealPrice() {
    this.upsertDialog.openUpsert$(
      {
        title: 'Оберіть мінімальну ціну страв, до всіх яких входить цінний інгредієнт',
        formComponent: ValuableIngredientMinMealPriceFilterFormComponent,
        initialValue: this.store.filters.minMealPrice.getMinMealPrice(),
        submitCallback: (priceRange) => {
          this.store.filters.minMealPrice.setMinMealPrice(priceRange);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }
}
