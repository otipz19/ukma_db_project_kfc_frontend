import {Component} from "@angular/core";
import {RegistrationFormComponent} from "../components/registration-form/registration-form.component";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  templateUrl: 'registration-page.component.html',
  imports: [
    RegistrationFormComponent
  ],
  styleUrl: 'registration-page.component.scss'
})
export class RegistrationPageComponent {

}
