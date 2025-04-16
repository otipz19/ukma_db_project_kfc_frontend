import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "../../../../../api/model/restaurant";
import {RESTAURANT_RESOLVER_KEY} from "../../../data-access/resolvers/restaurant.resolver";

@Component({
  selector: 'app-restaurant-dashboard',
  imports: [],
  templateUrl: './restaurant-dashboard.component.html',
  styleUrl: './restaurant-dashboard.component.scss'
})
export class RestaurantDashboardComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly $restaurant = signal<Restaurant | undefined>(undefined);

  constructor() {
    this.activatedRoute.data
      .subscribe(data => {
        const restaurant = data[RESTAURANT_RESOLVER_KEY];
        if(restaurant != undefined) {
          this.$restaurant.set(restaurant);
        }
      })
  }
}
