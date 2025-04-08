import {AfterViewInit, Component, inject, viewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {ConstructorOfType} from "../../../../type-utils/constructor-of-type";
import {MatButton} from "@angular/material/button";

export interface UpsertDialogFormComponent<TFormValue extends object> {
    initByValue(value: TFormValue): void;
    validate(): boolean;
    getFormValue(): TFormValue;
}

export type UpsertDialogData<TFormValue extends object> = {
  formComponent: ConstructorOfType<UpsertDialogFormComponent<TFormValue>>,
  title: string
  initialValue?: TFormValue
};

@Component({
  selector: 'app-upsert-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './upsert-dialog.component.html',
  styleUrl: './upsert-dialog.component.scss'
})
export class UpsertDialogComponent<TFormValue extends object> implements AfterViewInit {
  private readonly dialogRef = inject(MatDialogRef<TFormValue | undefined>);
  protected readonly data: UpsertDialogData<TFormValue> = inject(MAT_DIALOG_DATA);

  private readonly formContainer = viewChild.required('formContainer', {
    read: ViewContainerRef
  });

  private formComponentInstance!: UpsertDialogFormComponent<TFormValue>;

  ngAfterViewInit(): void {
    const formComponentRef = this.formContainer().createComponent(this.data.formComponent);
    this.formComponentInstance = formComponentRef.instance;
    if(this.data.initialValue) {
      this.formComponentInstance.initByValue(this.data.initialValue);
    }
  }

  onSubmit(clickEvent: MouseEvent) {
    clickEvent.stopPropagation();
    if (this.formComponentInstance.validate()) {
      this.dialogRef.close(this.formComponentInstance.getFormValue());
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
