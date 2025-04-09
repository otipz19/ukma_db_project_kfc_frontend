import {inject, Injectable} from "@angular/core";
import {Restaurant, RestaurantControllerService} from "../../../../api";
import {RestaurantsStore} from "../../data-access/store/restaurants.store";
import {UpsertDialogService} from "../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {
  RestaurantUpsertFormComponent
} from "../../view/components/restaurant-upsert-form/restaurant-upsert-form.component";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditRestaurantService {
  private readonly api = inject(RestaurantControllerService);
  private readonly store = inject(RestaurantsStore);
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);

  edit(restaurant: Restaurant) {
    const {id, ...formInitValue} = restaurant;

    this.upsertDialog.openUpsert$({
      title: 'Редагування ресторана',
      initialValue: formInitValue,
      formComponent: RestaurantUpsertFormComponent,
      submitCallback: value => {
        return this.api.updateRestaurantById(id, value)
          .pipe(
            this.notify.notifyHttpRequest(),
            tap(() => {
              this.store.update(id, id);
            })
          )
      }
    });
  }
}
