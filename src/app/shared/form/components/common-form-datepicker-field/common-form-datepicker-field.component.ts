import {Component, input} from '@angular/core';
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessagePipe} from "../../pipes/error-message.pipe";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-common-form-datepicker-field',
  imports: [
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    ReactiveFormsModule,
    MatDatepickerInput,
    ErrorMessagePipe,
    MatLabel,
    MatError,
    MatSuffix,
  ],
  templateUrl: './common-form-datepicker-field.component.html',
  styleUrl: './common-form-datepicker-field.component.scss'
})
export class CommonFormDatepickerFieldComponent {
  readonly $control = input.required<FormControl>({alias: 'control'});
  readonly $label = input.required<string>({alias: 'label'});
  readonly $maxLength = input<number | undefined>(undefined, {alias: 'maxLength'});
}
