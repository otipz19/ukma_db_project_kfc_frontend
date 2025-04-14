import {Component, inject, output, signal} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeControllerService, EmployeePosition} from "../../../../../../../api";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {passwordsEqualValidator} from "../../../../../../auth/pages/registration/view/validators/passwordsEqual.validator";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {MatButton} from "@angular/material/button";
import {
  CommonFormPasswordFieldComponent
} from "../../../../../../../shared/form/components/common-form-password-field/common-form-password-field.component";
import {ErrorMessagePipe} from "../../../../../../../shared/form/pipes/error-message.pipe";
import {MatError, MatFormField} from "@angular/material/form-field";
import {
  ManagerPositionSelectOptions, MinorPositionsSelectOptions
} from "../../../../../view/select-models/employee-position-select-model";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {RestaurantControllerService} from "../../../../../../../api/api/restaurantController.service";
import {SelectOptionModel} from "../../../../../../../shared/form/utils/select-options";
import {Restaurant} from "../../../../../../../api/model/restaurant";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatLabel} from "@angular/material/input";
import {map, Observable, switchMap} from "rxjs";

type PersonalDataFormType = {
  passportNumber: string;
  surname: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  phoneNumber?: string;
};

type HiringDataFormType = {
  salary: number;
  position: EmployeePosition;
  restaurantId: number;
};

type AuthDataFormType = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export type EmployeeCreateFormResult = Omit<PersonalDataFormType & HiringDataFormType & AuthDataFormType, 'passwordConfirm'>;

@Component({
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    ReactiveFormsModule,
    CommonFormInputFieldComponent,
    CommonFormDatepickerFieldComponent,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    CommonFormPasswordFieldComponent,
    ErrorMessagePipe,
    MatError,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
  ],
  selector: 'app-employee-create-form',
  styleUrl: './employee-create-form.component.scss',
  templateUrl: './employee-create-form.component.html'
})
export class EmployeeCreateFormComponent {
  private readonly restaurantsApi = inject(RestaurantControllerService);
  private readonly employeeApi = inject(EmployeeControllerService);

  protected readonly submit = output<EmployeeCreateFormResult>();
  protected readonly cancel = output<void>();

  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly personalDataStepForm = this.fb
    .group<ControlsOf<PersonalDataFormType>>({
      passportNumber: this.fb.control('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      firstName: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
      surname: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
      middleName: this.fb.control('', [Validators.maxLength(64)]),
      birthDate: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control(''),
    });

  protected readonly hiringDataStepForm = this.fb
    .group<ControlsOf<HiringDataFormType>>({
      position: this.fb.control(null as any, [Validators.required]),
      restaurantId: this.fb.control(null as any, [Validators.required]),
      salary: this.fb.control(null as any, [Validators.required])
    })

  // For some buggy reasons code analyzer sees this.hiringDataStepForm.controls.position as FormGroup
  protected readonly positionFormControl: FormControl<EmployeePosition> = this.hiringDataStepForm.controls.position;

  protected readonly authDataStepForm = this.fb
    .group<ControlsOf<AuthDataFormType>>({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control("", [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
      passwordConfirm: this.fb.control("", [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
    }, {
      validators: [passwordsEqualValidator()]
    });

  // Just for convenient submit check
  protected readonly form = this.fb.group({
    personal: this.personalDataStepForm,
    hiring: this.hiringDataStepForm,
    auth: this.authDataStepForm
  });

  protected readonly $employeePositionOptions = signal<SelectOptionModel<EmployeePosition>[]>([]);

  protected readonly $restaurantsOptions = signal<Array<SelectOptionModel<Restaurant['id']>>>([]);

  constructor() {
    this.restaurantsApi.getAllRestaurants()
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(list => {
        const options = list.map(r => ({value: r.id, label: r.address}));
        this.$restaurantsOptions.set(options);
      });

    this.hiringDataStepForm.controls.restaurantId.valueChanges
      .pipe(
        takeUntilDestroyed(),
        switchMap(chosenRestaurantId => {
          return this.hasManager$(chosenRestaurantId);
        }),
        map(hasManager => {
          return hasManager ? MinorPositionsSelectOptions : ManagerPositionSelectOptions;
        })
      )
      .subscribe(options => {
        this.$employeePositionOptions.set(options);
      });
  }

  // TODO: Refactor when api is updated
  private hasManager$(restaurantId: Restaurant['id']): Observable<boolean> {
    return this.employeeApi.getAllEmployees(restaurantId)
      .pipe(
        map(employees => {
          const managers = employees.filter(e => e.position == EmployeePosition.MANAGER);
          return managers.length > 0;
        })
      )
  }

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {passwordConfirm, ...value} =
      {
        ...this.personalDataStepForm.getRawValue(),
        ...this.hiringDataStepForm.getRawValue(),
        ...this.authDataStepForm.getRawValue()
      };

    this.submit.emit(value);
  }

  protected onCancel() {
    this.cancel.emit();
  }
}
