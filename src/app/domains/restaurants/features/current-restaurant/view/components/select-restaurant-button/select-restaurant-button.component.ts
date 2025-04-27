import {Component, inject} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CurrentRestaurantService} from "../../../data-access/services/current-restaurant.service";

@Component({
  selector: 'app-select-restaurant-button',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './select-restaurant-button.component.html',
  styleUrl: './select-restaurant-button.component.scss'
})
export class SelectRestaurantButtonComponent {
  private readonly currentRestaurantService = inject(CurrentRestaurantService);

  protected onClick() {
    this.currentRestaurantService.selectCurrentRestaurant$()
      .subscribe();
  }
}
