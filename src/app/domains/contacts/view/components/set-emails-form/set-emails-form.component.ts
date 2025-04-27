import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {emailFormatValidator} from "../../../../../shared/form/validators/email-format.validator";
import {
  UpsertDialogFormComponent
} from "../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {debounceTime, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-set-emails-form',
  imports: [
    ReactiveFormsModule,
    CommonFormInputFieldComponent
  ],
  templateUrl: './set-emails-form.component.html',
  styleUrl: './set-emails-form.component.scss'
})
export class SetEmailsFormComponent implements UpsertDialogFormComponent<string[]> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    emails: this.fb.array<FormControl<string>>(
      [this.buildControl()]
    )
  });

  protected readonly emails = this.form.controls.emails;

  constructor() {
    this.emails.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(100),
        tap(() => {
          this.updateFields()
        })
      )
      .subscribe();
  }

  initByValue(value: string[]): void {
    const diff = value.length - this.emails.controls.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.addNextField();
      }
    }
    this.emails.patchValue(value);
    if (!this.isEmpty(this.emails.length - 1)) {
      this.addNextField();
    }
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  getFormValue(): string[] {
    const list = this.emails.getRawValue();
    return list.filter(v => v.trim() != '');
  }

  private updateFields() {
    if (!this.emails.invalid) {
      if (!this.isEmpty(this.emails.length - 1)) {
        this.addNextField();
      }
      if (this.emails.length > 1 && this.isEmpty(this.emails.length - 2) && this.isEmpty(this.emails.length - 2)) {
        this.emails.removeAt(this.emails.length - 1);
      }
    }
  }

  private isEmpty(index: number) {
    return this.emails.at(index).value == '';
  }

  private addNextField() {
    this.emails.push(this.buildControl());
  }

  private buildControl() {
    return this.fb.control('', [emailFormatValidator()]);
  }
}
