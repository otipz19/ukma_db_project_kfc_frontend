import {inject, provideAppInitializer} from "@angular/core";
import {UserRoleService} from "../services/user-role.service";

export const userRoleServiceInstantiateProvider = provideAppInitializer(() => {
  inject(UserRoleService);
});
