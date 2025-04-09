import {computed, inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UserRole} from "../../api/model/userRole";

type LinkAlias = 'ingredients' | 'restaurants' | 'meals' ;

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
    ['ADMIN', ['ingredients', 'restaurants', 'meals']],
  ]);

  private readonly allLinks = new Map<LinkAlias, SidenavLinkModel>([
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
      'meals',
      {
        routerLink: ['/', 'meals'],
        icon: 'lunch_dining',
        label: 'Страви'
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
