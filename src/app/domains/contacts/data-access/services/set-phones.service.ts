import {Observable} from "rxjs";
import {BaseSetContactsService} from "./base-set-contacts.service";
import {inject, Injectable} from "@angular/core";
import {UserPhonesControllerService} from "../../../../api/api/userPhonesController.service";
import {SetPhonesFormComponent} from "../../view/components/set-phones-form/set-phones-form.component";

@Injectable({
  providedIn: 'root'
})
export class SetPhonesService extends BaseSetContactsService {
  private readonly api = inject(UserPhonesControllerService);

  protected override request$(userId: number, contacts: string[]): Observable<any> {
    return this.api.setUserPhones(userId, contacts);
  }

  protected override getFormComponent() {
    return SetPhonesFormComponent;
  }

  protected override getTitle(): string {
    return 'Редагування номерів телефонів';
  }
}
