import { Component } from '@angular/core';
import {
  CreateOrderFormComponent
} from "../../../features/create-order/view/components/create-order-form/create-order-form.component";

@Component({
  selector: 'app-create-order-page',
  imports: [
    CreateOrderFormComponent
  ],
  templateUrl: './create-order-page.component.html',
  styleUrl: './create-order-page.component.scss'
})
export class CreateOrderPageComponent {

}
