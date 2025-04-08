import {AfterViewInit, Component, inject, viewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {ConstructorOfType} from "../../../../type-utils/constructor-of-type";
import {MatButton} from "@angular/material/button";

export interface UpsertDialogFormComponent<TViewDto extends object> {
    initByValue(value: TViewDto): void;
    getFormValue(): TViewDto;
}

export type UpsertDialogData<TViewDto extends object> = {
  formComponent: ConstructorOfType<UpsertDialogFormComponent<TViewDto>>,
  title: string
  initialValue?: TViewDto
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
export class UpsertDialogComponent<TViewDto extends object> implements AfterViewInit {
  private readonly dialogRef = inject(DialogRef<TViewDto | undefined>);
  protected readonly data: UpsertDialogData<TViewDto> = inject(MAT_DIALOG_DATA);

  private readonly formContainer = viewChild.required('formContainer', {
    read: ViewContainerRef
  });

  private formComponentInstance!: UpsertDialogFormComponent<TViewDto>;

  ngAfterViewInit(): void {
    const formComponentRef = this.formContainer().createComponent(this.data.formComponent);
    this.formComponentInstance = formComponentRef.instance;
    if(this.data.initialValue) {
      this.formComponentInstance.initByValue(this.data.initialValue);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.formComponentInstance.getFormValue());
  }

  onCancel() {
    this.dialogRef.close();
  }
}
