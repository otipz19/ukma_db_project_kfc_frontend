import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Restaurant} from "../../../../../api/model/restaurant";
import {RESTAURANT_RESOLVER_KEY} from "../../../data-access/resolvers/restaurant.resolver";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-restaurant-dashboard',
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './restaurant-dashboard.component.html',
  styleUrl: './restaurant-dashboard.component.scss'
})
export class RestaurantDashboardComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly $restaurant = signal<Restaurant>(this.activatedRoute.snapshot.data[RESTAURANT_RESOLVER_KEY]);
}
