import {Component} from "@angular/core";
import {RegistrationFormComponent} from "../components/registration-form/registration-form.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-registration-page',
  templateUrl: 'registration-page.component.html',
  imports: [
    RegistrationFormComponent,
    MatToolbar,
    MatIcon,
  ],
  styleUrl: 'registration-page.component.scss'
})
export class RegistrationPageComponent {

}
