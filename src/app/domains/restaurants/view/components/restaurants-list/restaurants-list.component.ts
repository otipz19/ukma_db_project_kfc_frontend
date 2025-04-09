import {Component, input} from '@angular/core';
import {Restaurant} from "../../../../../api";
import {RestaurantCardComponent} from "../restaurant-card/restaurant-card.component";

@Component({
  selector: 'app-restaurants-list',
  imports: [
    RestaurantCardComponent
  ],
  templateUrl: './restaurants-list.component.html',
  styleUrl: './restaurants-list.component.scss'
})
export class RestaurantsListComponent {
  readonly $restaurants = input.required<Array<Restaurant>>({alias: 'restaurants'});
}
