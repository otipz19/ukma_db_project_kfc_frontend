import {Component, input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {ClientMealInfo} from "../../../data-access/types/client-meal-info";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ImageLoaderDirective} from "../../../../../shared/features/images/view/directives/image-loader.directive";
import {ImageType} from "../../../../../api/model/imageType";

@Component({
  selector: 'app-order-meal-view-card',
    imports: [
        MatCard,
        MatIcon,
        MatIconButton,
        RouterLink,
        ImageLoaderDirective
    ],
  templateUrl: './order-meal-view-card.component.html',
  styleUrl: './order-meal-view-card.component.scss'
})
export class OrderMealViewCardComponent {
  readonly $meal = input.required<ClientMealInfo>({alias: 'meal'});
    protected readonly ImageType = ImageType;
}
