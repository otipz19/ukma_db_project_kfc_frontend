import {inject, Injectable} from "@angular/core";
import {ClientControllerService} from "../../../../api/api/clientController.service";
import {catchError, Observable, of, switchMap} from "rxjs";
import {UserPhonesControllerService} from "../../../../api/api/userPhonesController.service";
import {RegisterClientDto} from "../model/register-client.dto";
import {AuthService} from "../../../../core/services/auth.service";
import {UserEmailsControllerService} from "../../../../api/api/userEmailsController.service";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {voidOperator} from "../../../../shared/rxjs/operators/void-operator";

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationService {
  private readonly clientApi = inject(ClientControllerService);
  private readonly userPhonesApi = inject(UserPhonesControllerService);
  private readonly emailsApi = inject(UserEmailsControllerService);
  private readonly notify = inject(NotifyService);
  private readonly authService = inject(AuthService);

  register$(registerUserDto: RegisterClientDto): Observable<void> {
    const {phoneNumber, email, ...clientRegistrationDto} = registerUserDto;
    const {username, password} = clientRegistrationDto;

    return this.clientApi.registerClient(clientRegistrationDto)
      .pipe(
        switchMap(() => {
          return this.authService.login$(username, password);
        }),
        this.notify.notifyHttpRequest(),
        switchMap(() => {
          const phonesArray = phoneNumber ? [phoneNumber] : undefined;
          return this.userPhonesApi.setUserPhones(this.authService.$currentUser()!.id, phonesArray);
        }),
        switchMap(() => {
          const emailsArray = email ? [email] : undefined;
          return this.emailsApi.setUserEmails(this.authService.$currentUser()!.id, emailsArray);
        }),
        // If phone or email request fails just ignore it
        catchError(() => {
          return of(true);
        }),
        voidOperator()
      );
  }
}
