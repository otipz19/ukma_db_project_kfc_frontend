import {computed, inject, Injectable, signal} from "@angular/core";
import {AuthenticationControllerService} from "../../api/api/authenticationController.service";
import {map, Observable, switchMap, tap} from "rxjs";
import {voidOperator} from "../../shared/rxjs/operators/void-operator";
import {User, UserControllerService} from "../../api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly LS_KEY_ACCESS_TOKEN = "LS_KEY_ACCESS_TOKEN";
  private static readonly LS_KEY_REFRESH_TOKEN = "LS_KEY_REFRESH_TOKEN";

  private readonly authApi = inject(AuthenticationControllerService);
  private readonly userApi = inject(UserControllerService);

  private _accessToken: string | undefined;
  private _refreshToken: string | undefined;

  private readonly $currentUserInner = signal<User | undefined>(undefined);
  readonly $currentUser = this.$currentUserInner.asReadonly();
  readonly $isAuthenticated = computed(() => Boolean(this.$currentUser));

  constructor() {
    this._accessToken = localStorage.getItem(AuthService.LS_KEY_ACCESS_TOKEN) ?? undefined;
    this._refreshToken = localStorage.getItem(AuthService.LS_KEY_REFRESH_TOKEN) ?? undefined;
  }

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
      throw new Error('refreshSession was called without active session');
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
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.$currentUserInner.set(undefined);
  }

  get accessToken(): string | undefined {
    return this._accessToken;
  }

  get refreshToken(): string | undefined {
    return this._refreshToken;
  }

  private set accessToken(value: string | undefined) {
    if (value) {
      localStorage.setItem(AuthService.LS_KEY_ACCESS_TOKEN, value);
      this._accessToken = value;
    } else {
      localStorage.removeItem(AuthService.LS_KEY_ACCESS_TOKEN);
      this._accessToken = undefined;
    }
  }

  private set refreshToken(value: string | undefined) {
    if (value) {
      localStorage.setItem(AuthService.LS_KEY_REFRESH_TOKEN, value);
      this._refreshToken = value;
    } else {
      localStorage.removeItem(AuthService.LS_KEY_REFRESH_TOKEN);
      this._refreshToken = undefined;
    }
  }
}
