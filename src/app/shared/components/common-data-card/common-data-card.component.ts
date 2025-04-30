import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-common-data-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: './common-data-card.component.html',
  styleUrl: './common-data-card.component.scss'
})
export class CommonDataCardComponent {

}
