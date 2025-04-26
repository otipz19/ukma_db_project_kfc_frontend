import {computed, inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UserRole} from "../../api";

type LinkAlias = 'ingredients' | 'restaurants' | 'meals' | 'employees' | 'clients';

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
    [UserRole.ADMIN, ['meals', 'ingredients', 'restaurants', 'employees', 'clients']],
    [UserRole.MANAGER, ['meals', 'ingredients', 'restaurants', 'employees', 'clients']],
    [UserRole.CASHIER, ['meals']],
    [UserRole.COOK, ['meals', 'ingredients']],
    [UserRole.CLIENT, ['meals']],
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
      'ingredients',
      {
        routerLink: ['/', 'ingredients'],
        icon: 'kitchen',
        label: 'Інгредієнти'
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
      'employees',
      {
        routerLink: ['/', 'employees'],
        icon: 'work',
        label: 'Працівники'
      }
    ],
    [
      'clients',
      {
        routerLink: ['/', 'clients'],
        icon: 'person',
        label: 'Клієнти'
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
