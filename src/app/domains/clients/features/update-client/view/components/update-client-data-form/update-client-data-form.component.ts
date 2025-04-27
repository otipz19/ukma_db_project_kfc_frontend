import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {UpdateClient} from "../../../../../../../api/model/updateClient";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";

@Component({
  selector: 'app-update-client-data-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent,
    CommonFormInputFieldComponent
  ],
  templateUrl: './update-client-data-form.component.html',
  styleUrl: './update-client-data-form.component.scss'
})
export class UpdateClientDataFormComponent implements UpsertDialogFormComponent<UpdateClient> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<UpdateClient>>({
    firstName: this.fb.control("", [Validators.required, Validators.maxLength(64)]),
    surname: this.fb.control("", [Validators.required, Validators.maxLength(64)]),
    middleName: this.fb.control("", [Validators.maxLength(64)]),
    birthDate: this.fb.control("")
  });

  initByValue(value: UpdateClient): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  getFormValue(): UpdateClient {
    return this.form.getRawValue();
  }
}
