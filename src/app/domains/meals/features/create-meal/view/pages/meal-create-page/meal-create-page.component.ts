import { Component } from '@angular/core';
import {MealCreateFormComponent} from "../../components/meal-create-form/meal-create-form.component";

@Component({
  selector: 'app-meal-create-page',
  imports: [
    MealCreateFormComponent
  ],
  templateUrl: './meal-create-page.component.html',
  styleUrl: './meal-create-page.component.scss'
})
export class MealCreatePageComponent {

}
