import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Meal} from "../../../../../api/model/meal";
import {MEAL_RESOLVER_KEY} from "../../../data-access/resolvers/meal.resolver";

@Component({
  selector: 'app-view-meal-page',
  imports: [],
  templateUrl: './view-meal-page.component.html',
  styleUrl: './view-meal-page.component.scss'
})
export class ViewMealPageComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly $meal = signal<Meal>(this.route.snapshot.data[MEAL_RESOLVER_KEY]);
}
