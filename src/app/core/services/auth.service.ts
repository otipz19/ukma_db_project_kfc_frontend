import {computed, inject, Injectable, signal} from "@angular/core";
import {AuthenticationControllerService} from "../../api/api/authenticationController.service";
import {EMPTY, map, Observable, switchMap, tap} from "rxjs";
import {voidOperator} from "../../shared/rxjs/operators/void-operator";
import {User, UserControllerService} from "../../api";

type TokensDto = {
  accessToken: string,
  refreshToken: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly LS_KEY_TOKENS_DTO = "LS_KEY_TOKENS_DTO";

  private readonly authApi = inject(AuthenticationControllerService);
  private readonly userApi = inject(UserControllerService);

  private _tokensDto: TokensDto | undefined;

  private readonly $currentUserInner = signal<User | undefined>(undefined);
  readonly $currentUser = this.$currentUserInner.asReadonly();
  readonly $isAuthenticated = computed(() => Boolean(this.$currentUser()));
  readonly $role = computed(() => this.$currentUser()?.role);

  login$(username: string, password: string): Observable<void> {
    return this.authApi.loginUser({username, password})
      .pipe(
        tap(({token, refreshToken}) => {
          this.setTokens(token, refreshToken);
        }),
        switchMap(() => this.setCurrentUser$()),
      );
  }

  restoreSession$(): Observable<void> {
    const fromLs = localStorage.getItem(AuthService.LS_KEY_TOKENS_DTO);
    if (!fromLs) {
      return EMPTY;
    }

    this._tokensDto = JSON.parse(fromLs);
    return this.setCurrentUser$();
  }

  private setCurrentUser$(): Observable<void> {
    return this.userApi.getCurrentUser()
      .pipe(
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
        tap((accessToken) => {
          this.setTokens(accessToken, refreshToken);
        })
      )
  }

  closeSession() {
    this.clearTokens();
    this.$currentUserInner.set(undefined);
  }

  get accessToken(): string | undefined {
    return this._tokensDto?.accessToken;
  }

  get refreshToken(): string | undefined {
    return this._tokensDto?.refreshToken;
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this._tokensDto = {accessToken, refreshToken};
    localStorage.setItem(AuthService.LS_KEY_TOKENS_DTO, JSON.stringify(this._tokensDto));
  }

  private clearTokens() {
    localStorage.removeItem(AuthService.LS_KEY_TOKENS_DTO);
    this._tokensDto = undefined;
  }
}
