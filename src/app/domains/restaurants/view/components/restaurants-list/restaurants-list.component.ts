import {Component, input, output} from '@angular/core';
import {RestaurantCardComponent} from "../restaurant-card/restaurant-card.component";
import {Restaurant} from "../../../../../api/model/restaurant";

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
  readonly $hideActions = input<boolean>(false, {alias: 'hideActions'});

  protected readonly select = output<Restaurant>();

  protected readonly dummyRestaurantSkeleton: Restaurant = {
    id: -1,
    address: 'dmrst'
  };
}
