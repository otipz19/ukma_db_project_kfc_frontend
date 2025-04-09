import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserRole} from "../../api/model/userRole";

export const hasRoleRouteGuard = (allowedRole: UserRole): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const userRole = authService.$role();
    const isAllowed = userRole === allowedRole;
    if(isAllowed) {
      return true;
    }
    const router = inject(Router);
    return router.navigate(['/', 'forbidden']);
  }
};
