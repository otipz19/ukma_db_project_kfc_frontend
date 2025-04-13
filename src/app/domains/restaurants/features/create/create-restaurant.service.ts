import {inject, Injectable} from "@angular/core";
import {RestaurantsStore} from "../../data-access/store/restaurants.store";
import {UpsertDialogService} from "../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {
  RestaurantUpsertFormComponent
} from "../../view/components/restaurant-upsert-form/restaurant-upsert-form.component";
import {tap} from "rxjs";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";

@Injectable({
  providedIn: 'root'
})
export class CreateRestaurantService {
  private readonly api = inject(RestaurantControllerService);
  private readonly store = inject(RestaurantsStore);
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);

  create() {
    this.upsertDialog.openUpsert$({
      title: 'Створення ресторана',
      formComponent: RestaurantUpsertFormComponent,
      submitCallback: value => {
        return this.api.createRestaurant(value)
          .pipe(
            this.notify.notifyHttpRequest(),
            tap(id => {
              this.store.load(id);
            })
          )
      }
    });
  }
}
