import {computed, inject, Injectable} from "@angular/core";
import {OrderMeal} from "../types/order-meal";
import {AuthService} from "../../../../../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private static LS_KEY_SUFFIX = "KFC_ORDER_STATE";

  private readonly authService = inject(AuthService);

  private readonly $lsKey = computed(() => {
    const user = this.authService.$currentUser();
    if (!user) {
      return '';
    }
    return user.id + OrderStateService.LS_KEY_SUFFIX;
  })

  saveOrderState(meals: OrderMeal[]) {
    localStorage.setItem(this.$lsKey(), JSON.stringify(meals));
  }

  clearOrderState() {
    localStorage.removeItem(this.$lsKey());
  }

  getOrderState(): OrderMeal[] {
    const fromLs = localStorage.getItem(this.$lsKey());
    if(!fromLs) {
      return [];
    }
    return JSON.parse(fromLs);
  }
}
