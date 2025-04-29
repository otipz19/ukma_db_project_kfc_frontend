import {Component, computed, inject, signal} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SidenavLinksService} from "../../core/services/sidenav-links.service";
import {
  ToolbarUserMenuComponent
} from "../../domains/user/view/components/toolbar-user-menu/toolbar-user-menu.component";
import {AuthService} from "../../core/services/auth.service";
import {
  SelectRestaurantButtonComponent
} from "../../domains/restaurants/features/current-restaurant/view/components/select-restaurant-button/select-restaurant-button.component";
import {UserRole} from "../../api";

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavContainer,
    MatIcon,
    MatToolbar,
    RouterOutlet,
    MatNavList,
    MatListItem,
    RouterLink,
    MatSidenav,
    MatSidenavContent,
    MatIconButton,
    ToolbarUserMenuComponent,
    SelectRestaurantButtonComponent,
    MatButton,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  protected readonly authService = inject(AuthService);
  private readonly sidenavLinksService = inject(SidenavLinksService);

  protected readonly $sidenavLinks = this.sidenavLinksService.$sidenavLinks;

  protected $shouldShowSidenav = computed(() => {
    return this.$sidenavLinks().length !== 0;
  });

  protected $isAuthenticated = this.authService.$isAuthenticated;

  protected $isSidenavFixed = signal<boolean>(false);
  protected $isSidenavExpanded = signal<boolean>(false);

  protected onMenuButtonClick() {
    this.$isSidenavFixed.update(val => !val);
    this.$isSidenavExpanded.update(val => !val);
  }

  protected onSidenavMouseEnter() {
    this.changeSidenavExpandedState(true);
  }

  protected onSidenavMouseLeave() {
    this.changeSidenavExpandedState(false);
  }

  private changeSidenavExpandedState(isExpanded: boolean) {
    if (!this.$isSidenavFixed()) {
      this.$isSidenavExpanded.set(isExpanded);
    }
  }

  protected readonly UserRole = UserRole;
}
