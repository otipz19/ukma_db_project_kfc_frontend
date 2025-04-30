import {inject, Injectable, signal} from "@angular/core";
import {Restaurant} from "../../../../../../api/model/restaurant";
import {EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  SelectRestaurantDialogComponent
} from "../../view/components/select-restaurant-dialog/select-restaurant-dialog.component";
import {AuthService} from "../../../../../../core/services/auth.service";
import {RestaurantControllerService} from "../../../../../../api/api/restaurantController.service";
import {UserRole} from "../../../../../../api";

@Injectable({
  providedIn: 'root'
})
export class CurrentRestaurantService {
  private readonly matDialog = inject(MatDialog);
  private readonly authService = inject(AuthService);
  private readonly restaurantApi = inject(RestaurantControllerService);

  private readonly $currentRestaurant = signal<Restaurant | undefined>(undefined);

  getCurrentRestaurant$(): Observable<Restaurant> {
    const saved = this.$currentRestaurant();
    if (saved) {
      return of(saved);
    }

    return this.authService.$isEmployee() && !this.authService.hasRole(UserRole.ADMIN)
      ? this.setEmployeeRestaurant$()
      : this.selectCurrentRestaurant$();
  }

  private setEmployeeRestaurant$(): Observable<Restaurant> {
    const id = this.authService.$currentEmployee()!.restaurantId!;
    return this.restaurantApi.getRestaurantById(id)
      .pipe(
        tap(restaurant => {
          this.$currentRestaurant.set(restaurant);
        })
      );
  }

  selectCurrentRestaurant$(): Observable<Restaurant> {
    const dialogRef = this.matDialog.open<SelectRestaurantDialogComponent, void, Restaurant>(
      SelectRestaurantDialogComponent,
      {
        minWidth: '600px',
        minHeight: '400px'
      }
    );

    return dialogRef.afterClosed()
      .pipe(
        switchMap(restaurant => {
          if (restaurant) {
            return of(restaurant);
          }
          return EMPTY;
        }),
        tap(restaurant => {
          this.$currentRestaurant.set(restaurant);
        })
      );
  }
}
