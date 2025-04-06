import {computed, inject, Injectable, signal} from "@angular/core";
import {AuthenticationControllerService} from "../../../../api/api/authenticationController.service";
import {map, Observable, switchMap, tap, throwError} from "rxjs";
import {voidOperator} from "../../../../shared/rxjs/operators/void-operator";
import {User, UserControllerService} from "../../../../api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly LS_KEY_ACCESS_TOKEN = "LS_KEY_ACCESS_TOKEN";
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
          this.accessToken = token;
          this.refreshToken = refreshToken;
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

  refreshSession$(): Observable<string> {
    const refreshToken = this.refreshToken;
    if (!refreshToken) {
      return throwError(() => new Error('refreshSession was called without active session'));
    }

    return this.authApi.resetToken({refreshToken})
      .pipe(
        map(({token}) => token),
        tap((token) => {
          this.accessToken = token;
        })
      )
  }

  closeSession() {
    localStorage.removeItem(AuthService.LS_KEY_ACCESS_TOKEN);
    localStorage.removeItem(AuthService.LS_KEY_REFRESH_TOKEN);
    this.$currentUserInner.set(undefined);
  }

  get accessToken(): string | null {
    return localStorage.getItem(AuthService.LS_KEY_ACCESS_TOKEN);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(AuthService.LS_KEY_REFRESH_TOKEN);
  }

  private set accessToken(value: string) {
    localStorage.setItem(AuthService.LS_KEY_ACCESS_TOKEN, value);
  }

  private set refreshToken(value: string) {
    localStorage.setItem(AuthService.LS_KEY_REFRESH_TOKEN, value);
  }
}
