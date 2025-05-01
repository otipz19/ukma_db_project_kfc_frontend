import {Component, inject, OnInit, Signal} from '@angular/core';
import {RestaurantsListComponent} from "../../../../../view/components/restaurants-list/restaurants-list.component";
import {SearchBarComponent} from "../../../../../../../shared/components/search-bar/search-bar.component";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {RestaurantsStore} from "../../../../../data-access/store/restaurants.store";
import {Restaurant} from "../../../../../../../api/model/restaurant";

@Component({
  selector: 'app-select-restaurant-dialog',
  imports: [
    RestaurantsListComponent,
    SearchBarComponent,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './select-restaurant-dialog.component.html',
  styleUrl: './select-restaurant-dialog.component.scss'
})
export class SelectRestaurantDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<void, Restaurant>);
  private readonly store = inject(RestaurantsStore);

  protected $restaurants: Signal<Restaurant[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onSearch(query: string) {
    this.store.filters.query.setQuery(query);
    this.store.loadAll();
  }

  protected onSelect(restaurant: Restaurant) {
    this.dialogRef.close(restaurant);
  }
}
