import {Component, computed, input} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessagePipe} from "../../pipes/error-message.pipe";
import {MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {MatError, MatHint} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";

export type FormInputFieldType =
  | "email"
  | "number"
  | "tel"
  | "text";

@Component({
  selector: 'app-common-form-input-field',
  standalone: true,
  imports: [
    ErrorMessagePipe,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatPrefix,
    MatSuffix,
    MatIcon
  ],
  templateUrl: 'common-form-input-field.component.html',
  styleUrl: 'common-form-input-field.component.scss'
})
export class CommonFormInputFieldComponent {
  readonly $control = input.required<FormControl>({alias: 'control'});

  readonly $label = input.required<string>({alias: 'label'});
  readonly $labelFloat = input<'auto' | 'always'>('auto', {alias: 'labelFloat'});

  readonly $inputType = input<FormInputFieldType>('text', {alias: 'inputType'});
  readonly $maxLength = input<number | undefined>(undefined, {alias: 'maxLength'});

  readonly $textPrefix = input<string | undefined>(undefined, {alias: 'textPrefix'});
  readonly $textSuffix = input<string | undefined>(undefined, {alias: 'textSuffix'});

  readonly $iconSuffix = input<string | undefined>(undefined, {alias: 'iconSuffix'});

  protected readonly $computedIconSuffix = computed(() => {
    if (this.$iconSuffix()) {
      return this.$iconSuffix();
    }

    if (this.$inputType() in INPUT_TYPE_TO_ICON) {
      return INPUT_TYPE_TO_ICON[this.$inputType()];
    }

    return undefined;
  });
}

const INPUT_TYPE_TO_ICON: Partial<Record<FormInputFieldType, string>> = {
  email: 'email',
  tel: 'phone',
} as const;
