import {inject} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, tap} from "rxjs";
import {
  UpsertDialogFormComponent
} from "../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";

export abstract class BaseSetContactsForm implements UpsertDialogFormComponent<string[]> {
  protected readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    contacts: this.fb.array<FormControl<string>>(
      [this.buildControl()]
    )
  });

  protected readonly contacts = this.form.controls.contacts;

  constructor() {
    this.contacts.valueChanges
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
    const diff = value.length - this.contacts.controls.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.addNextField();
      }
    }
    this.contacts.patchValue(value);
    if (!this.isEmpty(this.contacts.length - 1)) {
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
    const list = this.contacts.getRawValue();
    return list.filter(v => v.trim() != '');
  }

  private updateFields() {
    if (!this.contacts.invalid) {
      if (!this.isEmpty(this.contacts.length - 1)) {
        this.addNextField();
      }
      if (this.contacts.length > 1 && this.isEmpty(this.contacts.length - 2) && this.isEmpty(this.contacts.length - 2)) {
        this.contacts.removeAt(this.contacts.length - 1);
      }
    }
  }

  private isEmpty(index: number) {
    return this.contacts.at(index).value == '';
  }

  private addNextField() {
    this.contacts.push(this.buildControl());
  }

  protected abstract buildControl(): FormControl<string>;
}
