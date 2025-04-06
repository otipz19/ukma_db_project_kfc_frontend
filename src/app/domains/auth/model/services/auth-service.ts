import {computed, inject, Injectable, signal} from "@angular/core";
import {AuthenticationControllerService} from "../../../../api/api/authenticationController.service";
import {Observable, switchMap, tap} from "rxjs";
import {voidOperator} from "../../../../shared/rxjs/operators/void-operator";
import {User, UserControllerService} from "../../../../api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly LS_KEY_JWT_TOKEN = "LS_KEY_JWT_TOKEN";
  private static readonly LS_KEY_REFRESH_TOKEN = "LS_KEY_REFRESH_TOKEN";

  private readonly authApi = inject(AuthenticationControllerService);
  private readonly userApi = inject(UserControllerService);

  private readonly $currentUserInner = signal<User | undefined>(undefined);
  readonly $currentUser = this.$currentUserInner.asReadonly();
  readonly $isAuthenticated = computed(() => Boolean(this.$currentUser));

  login$(username: string, password: string): Observable<void> {
    return this.authApi.loginUser({username, password})
      .pipe(
        tap(({token, refreshToken}) => {
          localStorage.setItem(AuthService.LS_KEY_JWT_TOKEN, token);
          localStorage.setItem(AuthService.LS_KEY_REFRESH_TOKEN, refreshToken);
        }),
        switchMap(() => {
          return this.userApi.getCurrentUser()
        }),
        tap(user => {
          this.$currentUserInner.set(user);
        }),
        voidOperator()
      );
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.LS_KEY_JWT_TOKEN);
  }
}
