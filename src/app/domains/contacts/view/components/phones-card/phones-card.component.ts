import {Component, inject, input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {ContactsStore} from "../../../data-access/store/contacts.store";
import {MatIcon} from "@angular/material/icon";
import {SetPhonesService} from "../../../data-access/services/set-phones.service";

@Component({
  selector: 'app-phones-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatAnchor,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './phones-card.component.html',
  styleUrl: './phones-card.component.scss'
})
export class PhonesCardComponent implements OnInit {
  private readonly store = inject(ContactsStore);
  private readonly editService = inject(SetPhonesService);

  readonly $userId = input.required<number>({alias: 'userId'});

  protected readonly $phones = this.store.$phones;

  ngOnInit() {
    this.store.load(this.$userId());
  }

  protected onEdit() {
    this.editService.set(this.$userId(), this.$phones());
  }
}
