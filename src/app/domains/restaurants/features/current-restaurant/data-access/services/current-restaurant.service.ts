import {inject, Injectable, signal} from "@angular/core";
import {Restaurant} from "../../../../../../api/model/restaurant";
import {EMPTY, Observable, of, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  SelectRestaurantDialogComponent
} from "../../view/components/select-restaurant-dialog/select-restaurant-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class CurrentRestaurantService {
  private readonly matDialog = inject(MatDialog);

  private readonly $currentRestaurant = signal<Restaurant | undefined>(undefined);

  getCurrentRestaurant$(): Observable<Restaurant> {
    const saved = this.$currentRestaurant();
    if (saved) {
      return of(saved);
    }
    return this.selectCurrentRestaurant$();
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
          if(restaurant) {
            return of(restaurant);
          }
          return EMPTY;
        })
      );
  }
}
