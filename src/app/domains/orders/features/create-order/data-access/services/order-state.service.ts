import {Injectable} from "@angular/core";
import {OrderMeal} from "../types/order-meal";

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private meals: OrderMeal[] = [];

  saveOrderState(meals: OrderMeal[]) {
    this.meals = [...meals];
  }

  clearOrderState() {
    this.meals = [];
  }

  getOrderState() {
    return [...this.meals];
  }
}
