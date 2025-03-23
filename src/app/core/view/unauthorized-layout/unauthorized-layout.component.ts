import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-unauthorized-layout',
  imports: [
    MatIcon,
    MatToolbar,
    RouterOutlet
  ],
  templateUrl: './unauthorized-layout.component.html',
  styleUrl: './unauthorized-layout.component.scss'
})
export class UnauthorizedLayoutComponent {

}
