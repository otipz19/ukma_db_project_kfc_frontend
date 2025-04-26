import {inject, Injectable} from "@angular/core";
import {ClientControllerService} from "../../../../api/api/clientController.service";
import {Observable, switchMap} from "rxjs";
import {UserPhonesControllerService} from "../../../../api/api/userPhonesController.service";
import {RegisterClientDto} from "../model/register-client.dto";
import {AuthService} from "../../../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationService {
  private readonly clientApi = inject(ClientControllerService);
  private readonly userPhonesApi = inject(UserPhonesControllerService);

  private readonly authService = inject(AuthService);

  register$(registerUserDto: RegisterClientDto): Observable<void> {
    const {phoneNumber, ...clientRegistrationDto} = registerUserDto;
    const {username, password} = clientRegistrationDto;

    return this.clientApi.registerClient(clientRegistrationDto)
      .pipe(
        switchMap(() => {
          return this.authService.login$(username, password);
        }),
        switchMap(() => {
          const phonesArray = phoneNumber ? [phoneNumber] : undefined;
          return this.userPhonesApi.setUserPhones(this.authService.$currentUser()!.id, phonesArray);
        })
      );
  }
}
