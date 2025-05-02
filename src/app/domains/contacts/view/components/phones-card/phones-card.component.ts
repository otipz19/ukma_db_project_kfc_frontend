import {Component, inject, input, OnInit} from '@angular/core';
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {ContactsStore} from "../../../data-access/store/contacts.store";
import {MatIcon} from "@angular/material/icon";
import {SetPhonesService} from "../../../data-access/services/set-phones.service";
import {CommonDataCardComponent} from "../../../../../shared/components/common-data-card/common-data-card.component";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-phones-card',
    imports: [
        MatAnchor,
        MatIcon,
        MatIconButton,
        CommonDataCardComponent,
    ],
  templateUrl: './phones-card.component.html',
  styleUrl: './phones-card.component.scss'
})
export class PhonesCardComponent implements OnInit {
  private readonly store = inject(ContactsStore);
  private readonly editService = inject(SetPhonesService);
  protected readonly authService = inject(AuthService);

  readonly $userId = input.required<number>({alias: 'userId'});

  protected readonly $phones = this.store.$phones;

  ngOnInit() {
    this.store.load(this.$userId());
  }

  protected onEdit() {
    this.editService.set(this.$userId(), this.$phones());
  }
}
