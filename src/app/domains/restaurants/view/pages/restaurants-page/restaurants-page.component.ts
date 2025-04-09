import {Component, inject, OnInit} from '@angular/core';
import {RestaurantsStore} from "../../../data-access/store/restaurants.store";
import {CreateRestaurantService} from "../../../features/create/create-restaurant.service";
import {RestaurantsListComponent} from "../../components/restaurants-list/restaurants-list.component";
import {MatButton} from "@angular/material/button";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-restaurants-page',
  imports: [
    RestaurantsListComponent,
    MatButton,
    SearchBarComponent
  ],
  templateUrl: './restaurants-page.component.html',
  styleUrl: './restaurants-page.component.scss'
})
export class RestaurantsPageComponent implements OnInit {
  private readonly store = inject(RestaurantsStore);
  private readonly createService = inject(CreateRestaurantService);

  protected readonly $restaurants = this.store.$viewList;

  ngOnInit() {
    this.store.loadAll();
  }

  protected onCreate() {
    this.createService.create();
  }

  protected onSearch(query: string) {
    this.store.filters.addressFilter.setFilter(query);
    this.store.forceSignalReload();
  }
}
