import {Component, input, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormInputFieldType} from "../common-form-input-field/common-form-input-field.component";
import {ErrorMessagePipe} from "../../pipes/error-message.pipe";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatHint} from "@angular/material/form-field";

@Component({
  selector: 'app-common-form-password-field',
  imports: [
    ErrorMessagePipe,
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatFormField,
  ],
  templateUrl: './common-form-password-field.component.html',
  styleUrl: './common-form-password-field.component.scss'
})
export class CommonFormPasswordFieldComponent {
  readonly $control = input.required<FormControl>({alias: 'control'});
  readonly $label = input.required<string>({alias: 'label'});
  readonly $maxLength = input<number | undefined>(undefined, {alias: 'maxLength'});

  protected readonly $showPassword = signal<boolean>(false);

  protected onShowPassword(event: MouseEvent) {
    event.stopPropagation();
    this.$showPassword.update(val => !val);
  }
}
