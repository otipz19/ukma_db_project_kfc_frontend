import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kfc_frontend';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'burger',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/burger.svg')
    );
  }

}
