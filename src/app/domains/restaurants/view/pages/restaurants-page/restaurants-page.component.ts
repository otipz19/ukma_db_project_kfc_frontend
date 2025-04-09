import {Component, inject, OnInit} from '@angular/core';
import {RestaurantsStore} from "../../../data-access/store/restaurants.store";
import {CreateRestaurantService} from "../../../features/create/create-restaurant.service";
import {RestaurantsListComponent} from "../../components/restaurants-list/restaurants-list.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-restaurants-page',
  imports: [
    RestaurantsListComponent,
    MatButton
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
}
