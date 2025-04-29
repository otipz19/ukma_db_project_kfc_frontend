import {booleanAttribute, Component, inject, input} from '@angular/core';
import {Meal} from '../../../../../api/model/meal';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {DeleteMealService} from "../../../features/delete-meal/data-access/services/delete-meal.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";

@Component({
  selector: 'app-meal-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatIcon,
    MatCardTitle,
    RouterLink,
    MatIconButton,
    MatCardTitle
  ],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss'
})
export class MealCardComponent {
  private readonly deleteService = inject(DeleteMealService);
  private readonly authService = inject(AuthService);

  protected readonly $userRole = this.authService.$role;

  readonly $meal = input.required<Meal>({alias: 'meal'});
  readonly $hideActions = input(false, {transform: booleanAttribute, alias: 'hideActions'});

  onDelete() {
    this.deleteService.delete(this.$meal());
  }

  protected readonly UserRole = UserRole;
}
