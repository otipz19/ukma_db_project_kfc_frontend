import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {AuthService} from "../../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar-user-menu',
  imports: [
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIconButton,
  ],
  templateUrl: './toolbar-user-menu.component.html',
  styleUrl: './toolbar-user-menu.component.scss'
})
export class ToolbarUserMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected onLogoutClick() {
    this.authService.closeSession();
    this.router.navigate(['/', 'auth', 'login']);
  }
}
