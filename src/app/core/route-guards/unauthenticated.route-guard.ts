import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const unauthenticatedRouteGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return !authService.$isAuthenticated();
};
