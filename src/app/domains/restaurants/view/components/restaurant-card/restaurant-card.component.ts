import {Component, inject, input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {EditRestaurantService} from "../../../features/edit/edit-restaurant.service";
import {DeleteRestaurantService} from "../../../features/delete/delete-restaurant.service";
import {Restaurant} from "../../../../../api/model/restaurant";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-restaurant-card',
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss'
})
export class RestaurantCardComponent {
  protected readonly authService = inject(AuthService);
  private editService = inject(EditRestaurantService);
  private deleteService = inject(DeleteRestaurantService);

  readonly $restaurant = input.required<Restaurant>({alias: 'restaurant'});
  readonly $hideActions = input<boolean>(false, {alias: 'hideActions'});

  onEdit() {
    this.editService.edit(this.$restaurant());
  }

  onDelete() {
    this.deleteService.delete(this.$restaurant());
  }

  protected readonly UserRole = UserRole;
}
