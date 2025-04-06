import {Component, computed, signal} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

type SidenavLinkModel = {
  routerLink: string[],
  icon: string,
  label: string
};

@Component({
  selector: 'app-admin-layout',
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
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  protected readonly sidenavLinks: readonly SidenavLinkModel[] = [
    {
      routerLink: ['/', 'ingredients'],
      icon: 'food_bank',
      label: 'Інгредієнти'
    },
    {
      routerLink: ['/', 'meals'],
      icon: 'lunch_dining',
      label: 'Страви'
    },
  ];

  protected $shouldShowSidenav = computed(() => {
    return this.sidenavLinks.length !== 0;
  });

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
}
