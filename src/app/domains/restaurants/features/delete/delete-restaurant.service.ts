import {inject, Injectable} from "@angular/core";
import {RestaurantsStore} from "../../data-access/store/restaurants.store";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {DeleteDialogService} from "../../../../shared/features/delete-dialog/services/delete-dialog.service";
import {switchMap} from "rxjs";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {Restaurant} from "../../../../api/model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class DeleteRestaurantService {
  private readonly api = inject(RestaurantControllerService);
  private readonly store = inject(RestaurantsStore);
  private readonly deleteDialog = inject(DeleteDialogService);
  private readonly notify = inject(NotifyService);

  delete(restaurant: Restaurant) {
    this.deleteDialog.confirmDelete$({
      entityInstanceName: restaurant.address,
      entityTypeName: 'ресторан'
    })
      .pipe(
        switchMap(() => this.api.deleteRestaurantById(restaurant.id)),
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.store.remove(restaurant.id)
      });
  }
}
