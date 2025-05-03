import {computed, inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UserRole} from "../../api";

type LinkAlias = 'ingredients'
  | 'restaurants'
  | 'meals'
  | 'employees'
  | 'clients'
  | 'orders'
  | 'restaurants-statistics'
  | 'employee-statistics'
  | 'meal-statistics'
  | 'valuable-ingredients'
  | 'in-active-use-ingredients'
  | 'adventurous-clients';

type UserRoleState = UserRole | 'UNAUTHENTICATED';

export type SidenavLinkModel = {
  routerLink: string[],
  icon: string,
  label: string
};

@Injectable({
  providedIn: 'root'
})
export class SidenavLinksService {
  private readonly authService = inject(AuthService);

  private readonly roleToAllowedLinks = new Map<UserRoleState, Array<LinkAlias>>([
    [UserRole.ADMIN, ['meals', 'meal-statistics', 'ingredients', 'valuable-ingredients', 'in-active-use-ingredients', 'restaurants', 'restaurants-statistics', 'employees', 'employee-statistics', 'clients', 'adventurous-clients', 'orders']],
    [UserRole.MANAGER, ['meals', 'meal-statistics', 'ingredients', 'restaurants', 'employees', 'employee-statistics', 'clients', 'orders']],
    [UserRole.CASHIER, ['meals', 'orders', 'clients']],
    [UserRole.COOK, ['meals', 'ingredients', 'orders']],
    [UserRole.CLIENT, ['meals', 'orders']],
  ]);

  private readonly allLinks = new Map<LinkAlias, SidenavLinkModel>([
    [
      'meals',
      {
        routerLink: ['/', 'meals'],
        icon: 'lunch_dining',
        label: 'Страви'
      }
    ],
    [
      'meal-statistics',
      {
        routerLink: ['/', 'meal-statistics'],
        icon: 'analytics',
        label: 'Статистика страв'
      }
    ],
    [
      'ingredients',
      {
        routerLink: ['/', 'ingredients'],
        icon: 'kitchen',
        label: 'Інгредієнти'
      }
    ],
    [
      'valuable-ingredients',
      {
        routerLink: ['/', 'valuable-ingredients'],
        icon: 'analytics',
        label: 'Цінні інгредієнти'
      }
    ],
    [
      'in-active-use-ingredients',
      {
        routerLink: ['/', 'in-active-use-ingredients'],
        icon: 'analytics',
        label: 'Активні інгредієнти'
      }
    ],
    [
      'restaurants',
      {
        routerLink: ['/', 'restaurants'],
        icon: 'restaurant',
        label: 'Ресторани'
      }
    ],
    [
      'restaurants-statistics',
      {
        routerLink: ['/', 'restaurants-statistics'],
        icon: 'analytics',
        label: 'Статистика ресторанів'
      }
    ],
    [
      'employees',
      {
        routerLink: ['/', 'employees'],
        icon: 'work',
        label: 'Працівники'
      }
    ],
    [
      'employee-statistics',
      {
        routerLink: ['/', 'employee-statistics'],
        icon: 'analytics',
        label: 'Статистика працівників'
      }
    ],
    [
      'clients',
      {
        routerLink: ['/', 'clients'],
        icon: 'person',
        label: 'Клієнти'
      }
    ],
    [
      'adventurous-clients',
      {
        routerLink: ['/', 'adventurous-clients'],
        icon: 'analytics',
        label: 'Активні клієнти'
      }
    ],
    [
      'orders',
      {
        routerLink: ['/', 'orders'],
        icon: 'shopping_cart',
        label: 'Замовлення'
      }
    ]
  ]);

  $sidenavLinks = computed(() => {
    let roleState: UserRoleState = 'UNAUTHENTICATED';
    if (this.authService.$isAuthenticated()) {
      roleState = this.authService.$currentUser()!.role;
    }
    const allowedLinks = this.roleToAllowedLinks.get(roleState);
    if (!allowedLinks) {
      return [];
    }
    return allowedLinks.map(alias => this.allLinks.get(alias)!);
  });
}
