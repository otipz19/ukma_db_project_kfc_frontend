import {CanActivateFn} from "@angular/router";
import {UserRole} from "../../api";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const hasRoleRouteGuard = (allowedRole: UserRole): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const userRole = authService.$role();
    return userRole === allowedRole;
  }
};
