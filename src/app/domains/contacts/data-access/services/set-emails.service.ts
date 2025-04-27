import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SetEmailsFormComponent} from "../../view/components/set-emails-form/set-emails-form.component";
import {UserEmailsControllerService} from "../../../../api/api/userEmailsController.service";
import {BaseSetContactsService} from "./base-set-contacts.service";

@Injectable({
  providedIn: 'root'
})
export class SetEmailsService extends BaseSetContactsService {
  private readonly api = inject(UserEmailsControllerService);

  protected override request$(userId: number, contacts: string[]): Observable<any> {
    return this.api.setUserEmails(userId, contacts);
  }
  protected override getFormComponent(): any {
    return SetEmailsFormComponent;
  }
  protected override getTitle(): string {
    return 'Редагування електронної пошти';
  }
}
