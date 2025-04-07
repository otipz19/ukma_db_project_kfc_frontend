import {Component, inject} from '@angular/core';
import {
  MatCard,
  MatCardActions, MatCardContent, MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {emailValidator} from "../../../../../../../shared/form/validators/email.validator";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  CommonFormPasswordFieldComponent
} from "../../../../../../../shared/form/components/common-form-password-field/common-form-password-field.component";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../../../../core/services/auth.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";

@Component({
  selector: 'app-login-form',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    ReactiveFormsModule,
    CommonFormInputFieldComponent,
    CommonFormPasswordFieldComponent,
    MatButton,
    MatIcon,
    MatCardFooter,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notifyService = inject(NotifyService);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, emailValidator()]),
    password: this.fb.control('', [Validators.required, Validators.maxLength(64)])
  });

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {email, password} = this.form.getRawValue();
    this.authService.login$(email, password)
      .pipe(
        this.notifyService.notifyHttpRequest()
      )
      .subscribe(() => {
        this.router.navigate(['/', 'landing']);
      });
  }
}
