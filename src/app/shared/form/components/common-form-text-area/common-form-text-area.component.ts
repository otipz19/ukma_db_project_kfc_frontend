import {Component, computed, input} from '@angular/core';
import {ErrorMessagePipe} from "../../pipes/error-message.pipe";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from "@angular/material/input";
import {FormInputFieldType} from "../common-form-input-field/common-form-input-field.component";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatHint} from "@angular/material/form-field";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-common-form-text-area',
  imports: [
    ErrorMessagePipe,
    FormsModule,
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatFormField,
    ReactiveFormsModule,
    CdkTextareaAutosize
  ],
  templateUrl: './common-form-text-area.component.html',
  styleUrl: './common-form-text-area.component.scss'
})
export class CommonFormTextAreaComponent {
  readonly $control = input.required<FormControl>({alias: 'control'});

  readonly $label = input.required<string>({alias: 'label'});
  readonly $labelFloat = input<'auto' | 'always'>('auto', {alias: 'labelFloat'});

  readonly $inputType = input<FormInputFieldType>('text', {alias: 'inputType'});
  readonly $maxLength = input<number | undefined>(undefined, {alias: 'maxLength'});

  readonly $textPrefix = input<string | undefined>(undefined, {alias: 'textPrefix'});
  readonly $textSuffix = input<string | undefined>(undefined, {alias: 'textSuffix'});

  readonly $iconSuffix = input<string | undefined>(undefined, {alias: 'iconSuffix'});

  protected readonly $computedIconSuffix = computed(() => {
    return this.$iconSuffix();
  });

  readonly $minRows = input<number | undefined>(undefined, {alias: 'minRows'});

  protected readonly $computedMinRows = computed(() => {
    return this.$minRows() ?? 3;
  });
}
